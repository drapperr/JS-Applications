function solve(){
   let list=document.querySelectorAll('.minimalistBlack tbody tr');
  
   Array.from(list).forEach(x=>x.addEventListener('click',target));

   function target(){
      if (this.hasAttribute('style')) {
         this.removeAttribute('style');
      }else{
         Array.from(list).forEach(x=>x.removeAttribute('style'));
         this.style.backgroundColor='#413f5e'
      }
   }
}
