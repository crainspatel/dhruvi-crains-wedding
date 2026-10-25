(() => {
 const tabs=[...document.querySelectorAll('.side-tab')];
 const panels=[...document.querySelectorAll('.family-panel')];
 function select(tab,focus=false){for(const t of tabs){const on=t===tab;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;}for(const p of panels)p.hidden=p.id!==tab.getAttribute('aria-controls');if(focus)tab.focus();}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const k=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;select(tabs[k],true);});});
})();
