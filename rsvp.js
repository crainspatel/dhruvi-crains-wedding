(()=>{
'use strict';
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbx4uNFZ3Agd4RN2NJMy34JeBpnNGfzLwG_QhtoKhULaeAV27PECWK2ZSaJm2z_RoHHdlg/exec';
const modal=document.getElementById('wedding-rsvp-overlay');
const dialog=document.getElementById('wedding-rsvp');
const form=document.getElementById('wedding-rsvp-form');
const status=document.getElementById('rsvp-status');
const success=document.getElementById('rsvp-success');
const formHeading=document.getElementById('rsvp-form-heading');
const submit=form.querySelector('[type="submit"]');
const opener=document.querySelector('[data-rsvp-open]');
const nonceInput=document.getElementById('rsvp-nonce');
const origin=window.location.origin;
let oldFocus=null, waiting=false, nonce='', timeout=null;
form.action=ENDPOINT;
function show(){oldFocus=document.activeElement;modal.hidden=false;document.body.classList.add('rsvp-locked');dialog.querySelector('.rsvp-close').focus();}
function hide(){if(waiting)return;modal.hidden=true;document.body.classList.remove('rsvp-locked');if(oldFocus && typeof oldFocus.focus==='function')oldFocus.focus();}
function finish(ok,msg){
 if(!waiting)return;
 waiting=false;clearTimeout(timeout);submit.disabled=false;submit.textContent='Send RSVP';
 if(ok){
   form.hidden=true;
   formHeading.hidden=true;
   success.hidden=false;
   dialog.setAttribute('aria-labelledby','rsvp-success-title');
   dialog.removeAttribute('aria-describedby');
   status.textContent='';
   success.setAttribute('tabindex','-1');
   success.focus();
 }else{
   status.textContent=msg||'We could not confirm your RSVP. Please check with us before trying again.';
 }
}
opener.addEventListener('click',show);
dialog.querySelectorAll('[data-rsvp-close]').forEach(b=>b.addEventListener('click',hide));
modal.addEventListener('mousedown',e=>{if(e.target===modal)hide();});
document.addEventListener('keydown',e=>{
 if(modal.hidden)return;
 if(e.key==='Escape'){e.preventDefault();hide();return;}
 if(e.key!=='Tab')return;
 const focusables=[...dialog.querySelectorAll('button:not([disabled]):not([hidden]),input:not([type=hidden]):not([disabled])')].filter(el=>el.offsetParent!==null);
 if(!focusables.length)return;
 const first=focusables[0],last=focusables[focusables.length-1];
 if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
 else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
});
window.addEventListener('message',e=>{
 // Only trust responses from Google's Apps Script hosting, with this submission's random nonce.
 if(!/^https:\/\/([a-z0-9-]+\.)*(googleusercontent\.com|script\.google\.com)$/.test(e.origin))return;
 const d=e.data;if(!d||d.type!=='wedding-rsvp-result'||d.nonce!==nonce)return;
 finish(d.ok===true,d.ok?'':'The RSVP could not be saved. Please try again.');
});
form.addEventListener('submit',e=>{
 status.textContent='';
 const name=form.elements.name.value.trim();
 const count=form.elements.count.value.trim();
 const arrangements=form.querySelector('input[name="arrangements"]:checked');
 if(!name||name.length>150||!/^[1-9][0-9]*$/.test(count)||!Number.isSafeInteger(Number(count))||!arrangements){
 e.preventDefault();status.textContent='Please complete all three fields. Guest count must be a positive whole number.';return;
 }
 if(waiting){e.preventDefault();return;}
 nonce=crypto.randomUUID?crypto.randomUUID():String(Date.now())+'-'+String(Math.random()).slice(2);
 nonceInput.value=nonce;waiting=true;submit.disabled=true;submit.textContent='Sending…';
 timeout=setTimeout(()=>finish(false,'We could not confirm your RSVP. Please contact us before submitting again to avoid duplicates.'),20000);
});
})();
