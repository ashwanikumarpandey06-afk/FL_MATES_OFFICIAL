
const DEFAULT={settings:{siteName:"FL MATES",email:"flmatessofficial@gmail.com",youtube:"https://youtube.com/@FLMates",instagram:"https://instagram.com/flmates_official",whatsapp:"https://whatsapp.com/channel/FLMates"},announcements:[
{date:"18 May 2025",title:"Guild Test registration is open now!",text:"Don't miss the chance to join FL Mates. Register before 22 May."},
{date:"17 May 2025",title:"New tournament on 25 May!",text:"Get your squad ready and register now."},
{date:"16 May 2025",title:"Follow our social media",text:"Stay connected on YouTube, Instagram & WhatsApp for all updates."},
{date:"15 May 2025",title:"New rules for tournaments",text:"Please read all tournament rules carefully before participating."},
{date:"14 May 2025",title:"Thank You FL Mates Family!",text:"We reached 10K+ YouTube subscribers. Keep supporting!"}],
tournaments:[
{title:"FL Mates FF E-Sports Rapid Tournament",date:"25 May 2025",mode:"Clash Squad",map:"Bermuda",entry:"50 Diamonds / Team",prize:"₹2000 + E-Certificates"},
{title:"FL Mates Cup",date:"10 Jun 2025",mode:"Clash Squad",map:"Bermuda",entry:"60 Diamonds",prize:"₹2000"},
{title:"FL Mates Championship",date:"20 Jun 2025",mode:"Battle Royale",map:"Bermuda",entry:"80 Diamonds",prize:"₹5000"}],registrations:[],contactMessages:[]};
function data(){let x=localStorage.getItem("flmatesStaticData");if(!x){localStorage.setItem("flmatesStaticData",JSON.stringify(DEFAULT));return structuredClone(DEFAULT)}return JSON.parse(x)}
function save(x){localStorage.setItem("flmatesStaticData",JSON.stringify(x))}
function toast(s){const t=document.getElementById("toast");if(!t)return;t.textContent=s;t.style.display="block";setTimeout(()=>t.style.display="none",2300)}
function anns(){const e=document.getElementById("announcementList");if(!e)return;const d=data();e.innerHTML=d.announcements.map(a=>`<div class="notice"><b><span style="color:#ef2630">${a.date}</span> &nbsp; ${a.title}</b><small>${a.text}</small></div>`).join("")}
function tours(){const e=document.getElementById("tournamentList");if(!e)return;const d=data();e.innerHTML=d.tournaments.map((t,i)=>`<div class="card"><div class="card-img" style="background-image:url('assets/card-tournament.svg')"></div><div class="card-body"><h3>${t.title}</h3><p>${t.mode} • ${t.map}<br>${t.entry} • ${t.prize}</p><div class="date">◉ ${t.date}</div><br><button class="btn small" onclick="registerTournament(${i})">REGISTER NOW</button></div></div>`).join("")}
function registerTournament(i){const d=data(),t=d.tournaments[i];const name=prompt("Enter player/team name:");if(!name)return;d.registrations.push({id:"FLM-"+Math.random().toString(36).slice(2,8).toUpperCase(),name,tournament:t.title,date:new Date().toLocaleString(),status:"Pending"});save(d);alert("Registration submitted for "+t.title+"!")}
function initForms(){
 const c=document.getElementById("contactForm");if(c)c.addEventListener("submit",e=>{e.preventDefault();let d=data();d.contactMessages.push({name:c.name.value,email:c.email.value,subject:c.subject.value,message:c.message.value,date:new Date().toLocaleString()});save(d);c.reset();toast("Message sent successfully.")});
 const g=document.getElementById("guildForm");if(g)g.addEventListener("submit",e=>{e.preventDefault();let d=data(),id="FLM-"+Math.random().toString(36).slice(2,8).toUpperCase();d.registrations.push({id,name:g.name.value,uid:g.uid.value,discord:g.discord.value,date:new Date().toLocaleString(),status:"Pending"});save(d);g.reset();document.getElementById("generatedId").textContent=id;toast("Guild registration submitted.")});
}
document.addEventListener("DOMContentLoaded",()=>{
 anns();tours();initForms();
 document.querySelectorAll("[data-site-name]").forEach(e=>e.textContent=data().settings.siteName);
 document.querySelectorAll(".tabs button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 }));
})
