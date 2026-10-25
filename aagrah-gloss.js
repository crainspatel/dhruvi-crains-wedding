/* Show the Gujarati sense of 'Aagrah' on hover, tap/click, or keyboard focus. */
(() => {
 'use strict';
 const wrapper=document.querySelector('.aagrah-gloss');
 const button=wrapper?.querySelector('.aagrah-word');
 if (!wrapper || !button) return;
 const close=()=>{wrapper.classList.remove('is-open');wrapper.classList.add('is-dismissed');button.setAttribute('aria-expanded','false');};
 button.addEventListener('click', (event)=>{
   event.stopPropagation();
   wrapper.classList.remove('is-dismissed');
   const open=!wrapper.classList.contains('is-open');
   wrapper.classList.toggle('is-open',open);
   button.setAttribute('aria-expanded',String(open));
 });
 wrapper.addEventListener('pointerenter',()=>wrapper.classList.remove('is-dismissed'));
 button.addEventListener('focus',()=>wrapper.classList.remove('is-dismissed'));
 document.addEventListener('click',(event)=>{if(!wrapper.contains(event.target))close();});
 document.addEventListener('keydown',(event)=>{if(event.key==='Escape' && wrapper.classList.contains('is-open')){close();button.focus();}});
})();
