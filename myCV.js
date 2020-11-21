// Write text
const siteName=document.querySelector('.site-name h1');
const siteslogan=document.querySelector('.site-slogan h3');
const name="I'm Tuan Pham";
let idx=0;
function writeName(txt,selector){
    let text=txt.slice(0,idx);
    let e='';
    text.split('').forEach((char)=>{
      e+=char;
    });
    selector.innerText=e;
    idx++;
    if(idx>txt.length-1) {
      clearInterval(writeName);
  }
  
}
function loadWriteName(){
  if(document.documentElement.scrollTop==0){
    setInterval(writeName,150,"I'm Tuan Pham",siteName);
    setInterval(writeName,150,'a fresher front-end developer',siteslogan);  
  }
}

//Make Circle text
function circularText(txt, radius, classIndex) {
    txt = txt.split(""),
    classIndex = document.getElementsByClassName("circTxt")[classIndex];
    var deg = 360 / txt.length,
      origin = -90;
  
    txt.forEach((ea) => {
      ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%'>${ea}</p>`;
      classIndex.innerHTML += ea;
      origin += deg;
    });
  }

    circularText("ToTop-TuanPham-", 30, 0);

// show/hide Menu Bar
const barBtn=document.getElementById('barbtn');
const layerMenu=document.getElementById('layerMenu');
barBtn.addEventListener('click',showMenu);
layerMenu.addEventListener('click',showMenu);
function showMenu(){
  const menu=document.getElementById('sidebar');
  const menuLeft=window.getComputedStyle(menu).getPropertyValue('left');
  if(menuLeft=='-200px'){
    menu.style.left=0;
    barBtn.classList.add('activemenu');
    layerMenu.classList.add('show-layer');
  }
  else{
    menu.style.left="-200px";
    barBtn.classList.remove('activemenu'); 
    layerMenu.classList.remove('show-layer');
  }
}
//Close Menu when Select from Menu on mobile
const liItems=document.querySelectorAll('.sidebar-menu ul li a');

const liItemsArr=Array.from(liItems);
const liItemsArrL=liItemsArr.length;
for(let i=0;i<liItemsArrL;i++){
  if(window.innerWidth<=768){
    liItemsArr[i].addEventListener('click',showMenu);
  }
  liItemsArr[i].addEventListener('click',function(){toElmMenu(i)});
}

// Scroll to each item of Menu 
const contents=document.querySelectorAll('section.content');
const contentsArr=Array.from(contents);
const contentsOffsetTop=[];
contentsArr.forEach((content)=>{  
  contentsOffsetTop.push(content.offsetTop);
});

function toElmMenu(liElement){
  liElement==liItemsArrL-1?document.documentElement.scrollTop=contentsOffsetTop[liElement]+700:
  document.documentElement.scrollTop=contentsOffsetTop[liElement]-20;
}
// Scroll To Top
const toTop=document.getElementById('to-top');
toTop.addEventListener('click',topFunction);
toTop.addEventListener('mouseover',()=>{
  toTop.style.opacity=1;
});
let deg=0;
let docScrollTop;
window.onscroll=function(){
  loadWriteName();
  //Rotate toTop
  docScrollTop=document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
  deg=docScrollTop/5;
  toTop.style.transform=`rotate(${deg}deg)`;
  if(docScrollTop>=20){
    toTop.style.opacity=0.6;
  }
  else{
    toTop.style.opacity=0;
  }
  // Creat scroll effect for background image of banner
  const bannerBgr=document.querySelector('.banner');
  if(docScrollTop<window.innerHeight){
    window.innerHeight<=625?bannerBgr.style.backgroundPosition=`50% -${docScrollTop/2}px`:
    bannerBgr.style.backgroundPosition=`50% -${docScrollTop/4}px`;
  }
  //Add .active class for each item of menu
  for(let i=1;i<liItemsArrL-1;i++){
    if(docScrollTop<contentsOffsetTop[i+1]-100
      && docScrollTop>=contentsOffsetTop[i]-100){
      liItemsArr[i].classList.add('active');
    }
    else{
      liItemsArr[i].classList.remove('active');
    }
    if(docScrollTop<contentsOffsetTop[i+1]
      && docScrollTop>=contentsOffsetTop[i]-300){
        contentsArr[i].classList.add('loadweb');
      }
  }
  if(document.documentElement.offsetHeight<=window.innerHeight+docScrollTop+1){
    liItemsArr[liItemsArrL-1].classList.add('active');
    liItemsArr[liItemsArrL-2].classList.remove('active');
  }
  else{
    liItemsArr[liItemsArrL-1].classList.remove('active'); 
  }
  //console.log(document.documentElement.scrollTop);
  //console.log(document.documentElement.offsetHeight-window.innerHeight-document.documentElement.scrollTop);
};
function topFunction(){
  document.body.scrollTop=0; // For Safari
  document.documentElement.scrollTop=0; // For Chrome, Firefox, IE and Opera
}
window.onload=()=>{
  docScrollTop=document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
  if(docScrollTop<contentsOffsetTop[1]){
    liItemsArr[0].classList.add('active');
  }
  loadWriteName();
};

