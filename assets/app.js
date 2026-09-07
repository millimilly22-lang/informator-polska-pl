
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
const map=[
 {k:['800','dziecko','świadczenie','rodzic'],u:'/800-plus/',t:'800+ — wniosek i cały proces'},
 {k:['firma','działalność','biznes','ceidg','jdg'],u:'/jak-zalozyc-firme/',t:'Jak założyć firmę w Polsce'},
 {k:['zus','składki','ubezpieczenie'],u:'/zus/',t:'ZUS — rejestracja, składki i sprawy przedsiębiorcy'},
 {k:['pit','podatek','rozliczenie'],u:'/pit/',t:'PIT — rozliczenie krok po kroku'},
 {k:['vat','vat-r'],u:'/vat/',t:'VAT — podstawy i rejestracja'},
 {k:['pesel'],u:'/pesel/',t:'PESEL — jak uzyskać numer'},
 {k:['mobywatel','mdowód'],u:'/mobywatel/',t:'mObywatel — dokumenty i usługi'},
 {k:['bezrobot','pracy','straciłem pracę','stracilem prace'],u:'/rejestracja-bezrobotny/',t:'Rejestracja jako osoba bezrobotna'},
 {k:['zdrowie','nfz','lekarz','ikp','recepta'],u:'/nfz-zdrowie/',t:'NFZ i IKP — jak korzystać z publicznej opieki zdrowotnej'},
 {k:['pobyt','karta pobytu','cudzoziem'],u:'/pobyt-w-polsce/',t:'Pobyt w Polsce — przewodnik dla cudzoziemców'}
];
function findGuide(txt){txt=(txt||'').toLowerCase();return map.find(x=>x.k.some(k=>txt.includes(k)))}
function siteSearch(){let v=q('#siteSearch')?.value||'';let g=findGuide(v);if(g) location.href=g.u;else {let cards=qa('[data-search]'); if(cards.length){cards.forEach(c=>c.classList.toggle('hide',!c.dataset.search.toLowerCase().includes(v.toLowerCase())));q('#guides')?.scrollIntoView({behavior:'smooth'});}}}
q('#siteSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')siteSearch()});
function reply(txt){let g=findGuide(txt), out='';let x=txt.toLowerCase();
 if(g){out=`Najlepszy poradnik dla tej sprawy: ${g.t}. Otworzę Ci właściwy proces krok po kroku.`;setTimeout(()=>{location.href=g.u},900)}
 else if(x.includes('sam')||x.includes('wspóln')||x.includes('wspoln')) out='Jeśli zakładasz biznes sam, najczęściej porównuje się JDG z działalnością nierejestrowaną (gdy spełniasz warunki). Ze wspólnikiem trzeba rozważyć właściwą formę spółki. Napisz: „firma”, a pokażę pełny proces.';
 else out='Napisz krótko, co chcesz załatwić, np. „800 plus”, „otworzyć firmę”, „ZUS”, „PIT”, „PESEL”, „straciłem pracę”, „lekarz NFZ” albo „karta pobytu”.';
 return out}
function sendChat(){let inp=q('#chatText');if(!inp||!inp.value.trim())return;let msgs=q('#msgs'),text=inp.value.trim();msgs.insertAdjacentHTML('beforeend',`<div class="msg user"></div>`);msgs.lastElementChild.textContent=text;inp.value='';setTimeout(()=>{msgs.insertAdjacentHTML('beforeend',`<div class="msg bot"></div>`);msgs.lastElementChild.textContent=reply(text);msgs.scrollTop=msgs.scrollHeight},180)}
q('#chatSend')?.addEventListener('click',sendChat);q('#chatText')?.addEventListener('keydown',e=>{if(e.key==='Enter')sendChat()});
