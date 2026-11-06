const photoInput=document.getElementById('photoInput');
const preview=document.getElementById('photoPreview');
const dropZone=document.getElementById('dropZone');
const textArea=document.getElementById('materialText');
let selectedMode='summary';
photoInput.addEventListener('change',()=>{
  const file=photoInput.files[0];
  if(!file)return;
  if(file.size>10*1024*1024){alert('Ukuran foto maksimal 10 MB.');photoInput.value='';return;}
  if(!file.type.startsWith('image/')){alert('Silakan pilih file gambar.');return;}
  preview.src=URL.createObjectURL(file);dropZone.classList.add('has-image');
});
document.querySelectorAll('.activity').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.activity').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');selectedMode=btn.dataset.mode;
}));
const demoAlert='<div class="demo-alert">✨ <b>Mode prototype:</b> hasil di bawah adalah contoh interaksi lokal, bukan jawaban dari AI sungguhan. Integrasi AI dan pembacaan teks dari foto perlu dihubungkan melalui backend yang aman.</div>';
function getText(){return textArea.value.trim();}
function renderResult(){
  const material=getText();
  const hasPhoto=photoInput.files.length>0;
  if(!material&&!hasPhoto){alert('Masukkan teks materi atau unggah foto buku terlebih dahulu.');return;}
  const subject=document.getElementById('subject').value;
  const grade=document.getElementById('grade').value;
  const panel=document.getElementById('resultPanel');
  const content=document.getElementById('resultContent');
  const title=document.getElementById('resultTitle');
  const short=material||'Foto materi berhasil dipilih. Untuk prototype ini, ketik atau tempelkan isi materi agar contoh sesi belajar dapat dibuat.';
  const sentences=short.split(/(?<=[.!?])\s+/).filter(Boolean);
  const topic=sentences[0]||short;
  const words=short.split(/\s+/).filter(Boolean);
  if(selectedMode==='summary'){
    title.textContent='Rangkuman singkat';
    content.innerHTML=demoAlert+`<div class="result-copy"><b>Mata pelajaran:</b> ${escapeHtml(subject)} · ${escapeHtml(grade)}\n\n<b>Gambaran materi</b>\n${escapeHtml(topic)}\n\n<b>Poin penting</b>\n${sentences.slice(1,4).map((s,i)=>(i+1)+'. '+escapeHtml(s)).join('\n')||'• Baca kembali materi dan tandai istilah penting.\n• Cari contoh yang dekat dengan kehidupan sehari-hari.\n• Coba jelaskan kembali dengan kata-katamu sendiri.'}\n\n<b>Tips mengingat</b>\nBaca satu bagian, tutup buku, lalu coba ceritakan kembali tanpa melihat catatan.</div>`;
  }else if(selectedMode==='explain'){
    title.textContent='Mari pahami pelan-pelan';
    content.innerHTML=demoAlert+`<div class="result-copy"><b>1. Kenali ide utamanya</b>\n${escapeHtml(topic)}\n\n<b>2. Pecah menjadi bagian kecil</b>\nBaca satu kalimat atau satu konsep terlebih dahulu. Cari arti kata yang belum kamu pahami.\n\n<b>3. Hubungkan dengan contoh</b>\nCoba temukan contoh dari rumah, sekolah, atau lingkungan sekitarmu.\n\n<b>4. Ceritakan kembali</b>\nJelaskan materi ini seolah-olah kamu sedang mengajari teman. Bagian yang masih membingungkan adalah bagian yang perlu dipelajari lagi.</div>`;
  }else if(selectedMode==='article'){
    title.textContent='Kerangka artikel';
    content.innerHTML=demoAlert+`<div class="result-copy"><b>Judul sementara</b>\n${escapeHtml(topic.slice(0,90))}\n\n<b>1. Pendahuluan</b>\nPerkenalkan topik, alasan topik ini penting, dan pertanyaan yang ingin dijawab.\n\n<b>2. Pembahasan</b>\nJelaskan konsep utama berdasarkan materi. Tambahkan contoh dan data dari sumber tepercaya.\n\n<b>3. Kesimpulan</b>\nRangkum temuan utama dan jawab pertanyaan pada pendahuluan.\n\n<b>Catatan:</b> Periksa fakta dan cantumkan sumber. Jangan mengarang kutipan atau data.</div>`;
  }else if(selectedMode==='sources'){
    title.textContent='Panduan mencari sumber';
    content.innerHTML=demoAlert+`<div class="result-copy"><b>Kata kunci pencarian</b>\n${escapeHtml(topic.slice(0,100))}\n\n<b>Tempat mencari referensi</b>\n• Buku pelajaran dan perpustakaan sekolah.\n• Situs lembaga pendidikan atau pemerintah.\n• Jurnal ilmiah dan publikasi universitas.\n\n<b>Sebelum memakai sumber, periksa:</b>\n1. Siapa penulis atau lembaga penerbitnya?\n2. Kapan informasi diterbitkan atau diperbarui?\n3. Apakah ada data dan referensi pendukung?\n4. Apakah sumber lain yang tepercaya menyatakan hal serupa?</div>`;
  }else{
    title.textContent='Kuis pilihan ganda';
    const qs=makeQuestions(topic,words);
    content.innerHTML=demoAlert+qs.map((q,i)=>`<div class="quiz-question" data-answer="${q.correct}"><b>${i+1}. ${escapeHtml(q.question)}</b>${q.options.map((o,j)=>`<button class="answer-option" data-index="${j}">${String.fromCharCode(65+j)}. ${escapeHtml(o)}</button>`).join('')}<div class="feedback"></div></div>`).join('');
    content.querySelectorAll('.answer-option').forEach(btn=>btn.addEventListener('click',()=>{
      const box=btn.closest('.quiz-question');if(box.dataset.done)return;box.dataset.done='1';
      const correct=Number(box.dataset.answer),picked=Number(btn.dataset.index);
      box.querySelectorAll('.answer-option').forEach((b,i)=>{if(i===correct)b.classList.add('correct');});
      if(picked!==correct)btn.classList.add('wrong');
      box.querySelector('.feedback').textContent=picked===correct?'✓ Tepat! Bagus, lanjutkan.':'Belum tepat. Jawaban yang benar ditandai dengan warna hijau.';
    }));
  }
  panel.classList.remove('hidden');panel.scrollIntoView({behavior:'smooth',block:'start'});
}
function makeQuestions(topic,words){
  const clean=topic.replace(/[.!?]+$/,'');
  const safe=clean.length>85?clean.slice(0,82)+'…':clean;
  const distractors=['Tidak berkaitan dengan topik','Selalu terjadi secara kebetulan','Tidak membutuhkan penjelasan'];
  return [
    {question:'Apa hal utama yang dibahas dalam materi yang kamu masukkan?',options:[safe,distractors[0],distractors[1],distractors[2]],correct:0},
    {question:'Apa langkah belajar yang baik setelah membaca materi?',options:['Menghafal tanpa memahami','Menjelaskan kembali dengan kata-kata sendiri','Mengabaikan istilah penting','Tidak perlu berlatih'],correct:1},
    {question:'Bagaimana cara memeriksa informasi untuk tugas?',options:['Mengambil dari satu unggahan anonim','Menghapus semua sumber','Membandingkan beberapa sumber tepercaya','Menyalin tanpa membaca'],correct:2}
  ];
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
document.getElementById('generateBtn').addEventListener('click',renderResult);
document.getElementById('resetBtn').addEventListener('click',()=>{document.getElementById('resultPanel').classList.add('hidden');});
