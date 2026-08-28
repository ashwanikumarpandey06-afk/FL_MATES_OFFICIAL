
function D(){return data()}function S(d){save(d);render();toast("Changes saved")}
function render(){const d=D();document.getElementById("statAnn").textContent=d.announcements.length;document.getElementById("statTour").textContent=d.tournaments.length;document.getElementById("statReg").textContent=d.registrations.length;document.getElementById("statMsg").textContent=d.contactMessages.length;
document.getElementById("annRows").innerHTML=d.announcements.map((a,i)=>`<tr><td>${a.date}</td><td>${a.title}</td><td><button class="btn small" onclick="editAnn(${i})">Edit</button> <button class="btn small" onclick="delAnn(${i})">Delete</button></td></tr>`).join("");
document.getElementById("tourRows").innerHTML=d.tournaments.map((t,i)=>`<tr><td>${t.title}</td><td>${t.date}</td><td>${t.entry}</td><td>${t.prize}</td><td><button class="btn small" onclick="editTour(${i})">Edit</button> <button class="btn small" onclick="delTour(${i})">Delete</button></td></tr>`).join("");
document.getElementById("regRows").innerHTML=d.registrations.map(r=>`<tr><td>${r.id||"-"}</td><td>${r.name}</td><td>${r.tournament||"Guild Test"}</td><td>${r.date}</td><td>${r.status}</td></tr>`).join("");
document.getElementById("msgRows").innerHTML=d.contactMessages.map(m=>`<tr><td>${m.name}</td><td>${m.email}</td><td>${m.subject}</td><td>${m.date}</td></tr>`).join("");
for(const [id,key] of [["siteName","siteName"],["siteEmail","email"],["youtube","youtube"],["instagram","instagram"],["whatsapp","whatsapp"]])document.getElementById(id).value=d.settings[key]}
function addAnn(){let d=D();let title=aTitle.value.trim(),date=aDate.value.trim(),text=aText.value.trim();if(!title||!date)return alert("Title and date required.");d.announcements.unshift({title,date,text});S(d);annForm.reset()}
function editAnn(i){let d=D(),a=d.announcements[i];let x=prompt("Title",a.title);if(x===null)return;let y=prompt("Description",a.text);if(y===null)return;let z=prompt("Date",a.date);if(z===null)return;Object.assign(a,{title:x,text:y,date:z});S(d)}
function delAnn(i){if(confirm("Delete this announcement?")){let d=D();d.announcements.splice(i,1);S(d)}}
function addTour(){let d=D();let title=tTitle.value.trim(),date=tDate.value.trim();if(!title||!date)return alert("Title and date required.");d.tournaments.unshift({title,date,mode:tMode.value,map:tMap.value,entry:tEntry.value,prize:tPrize.value});S(d);tourForm.reset()}
function editTour(i){let d=D(),t=d.tournaments[i];let x=prompt("Title",t.title);if(x===null)return;let y=prompt("Date",t.date);if(y===null)return;let z=prompt("Prize",t.prize);if(z===null)return;Object.assign(t,{title:x,date:y,prize:z});S(d)}
function delTour(i){if(confirm("Delete this tournament?")){let d=D();d.tournaments.splice(i,1);S(d)}}
function saveSettings(){let d=D();d.settings={siteName:siteName.value,email:siteEmail.value,youtube:youtube.value,instagram:instagram.value,whatsapp:whatsapp.value};S(d)}
function logout(){sessionStorage.removeItem("flAdmin");location.href="admin-login.html"}
document.addEventListener("DOMContentLoaded",()=>{if(!sessionStorage.getItem("flAdmin")){location.href="admin-login.html";return}render()})
