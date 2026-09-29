document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
toggle?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click",()=>links.classList.remove("open")));
document.getElementById("contactForm")?.addEventListener("submit",(e)=>{
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const subject = encodeURIComponent("Thinking Creative enquiry");
  const body = encodeURIComponent(
    "Name: "+f.get("name")+"\n"+
    "Email: "+f.get("email")+"\n"+
    "Student level: "+f.get("level")+"\n\n"+
    (f.get("message")||"")
  );
  window.location.href = "mailto:hello@thinkingcreative.example?subject="+subject+"&body="+body;
});
