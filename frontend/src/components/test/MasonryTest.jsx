import Masonry from '../ui/Masonry';

// Import all images from img1 to img20
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import img8 from '../../assets/img8.jpg';
import img9 from '../../assets/img9.jpg';
import img10 from '../../assets/img10.jpg';
import img11 from '../../assets/img11.jpg';
import img12 from '../../assets/img12.jpg';
import img13 from '../../assets/img13.jpg';
import img14 from '../../assets/img14.jpg';
import img15 from '../../assets/img15.jpg';
import img16 from '../../assets/img16.jpg';
import img17 from '../../assets/img17.jpg';
import img18 from '../../assets/img18.jpg';
import img19 from '../../assets/img19.jpg';
import img20 from '../../assets/img20.jpg';

// Import all detail images from detail1 to detail20
import detail1 from '../../assets/detail1.jpg';
import detail2 from '../../assets/detail2.jpg';
import detail3 from '../../assets/detail3.jpg';
import detail4 from '../../assets/detail4.jpg';
import detail5 from '../../assets/detail5.jpg';
import detail6 from '../../assets/detail6.jpg';
import detail7 from '../../assets/detail7.jpg';
import detail8 from '../../assets/detail8.jpg';
import detail9 from '../../assets/detail9.jpg';
import detail10 from '../../assets/detail10.jpg';
import detail11 from '../../assets/detail11.jpg';
import detail12 from '../../assets/detail12.jpg';
import detail13 from '../../assets/detail13.jpg';
import detail14 from '../../assets/detail14.jpg';
import detail15 from '../../assets/detail15.jpg';
import detail16 from '../../assets/detail16.jpg';
import detail17 from '../../assets/detail17.jpg';
import detail18 from '../../assets/detail18.jpg';
import detail19 from '../../assets/detail19.jpg';
import detail20 from '../../assets/detail20.jpg';

const items = [
  // img1 to img20
  { id: "img1", img: img1, url: "#", height: 400 },
  { id: "img2", img: img2, url: "#", height: 350 },
  { id: "img3", img: img3, url: "#", height: 450 },
  { id: "img4", img: img4, url: "#", height: 380 },
  { id: "img5", img: img5, url: "#", height: 420 },
  { id: "img6", img: img6, url: "#", height: 360 },
  { id: "img7", img: img7, url: "#", height: 390 },
  { id: "img8", img: img8, url: "#", height: 410 },
  { id: "img9", img: img9, url: "#", height: 370 },
  { id: "img10", img: img10, url: "#", height: 430 },
  { id: "img11", img: img11, url: "#", height: 400 },
  { id: "img12", img: img12, url: "#", height: 380 },
  { id: "img13", img: img13, url: "#", height: 420 },
  { id: "img14", img: img14, url: "#", height: 350 },
  { id: "img15", img: img15, url: "#", height: 450 },
  { id: "img16", img: img16, url: "#", height: 390 },
  { id: "img17", img: img17, url: "#", height: 410 },
  { id: "img18", img: img18, url: "#", height: 370 },
  { id: "img19", img: img19, url: "#", height: 430 },
  { id: "img20", img: img20, url: "#", height: 400 },
  
  // detail1 to detail20
  { id: "detail1", img: detail1, url: "#", height: 380 },
  { id: "detail2", img: detail2, url: "#", height: 420 },
  { id: "detail3", img: detail3, url: "#", height: 360 },
  { id: "detail4", img: detail4, url: "#", height: 450 },
  { id: "detail5", img: detail5, url: "#", height: 390 },
  { id: "detail6", img: detail6, url: "#", height: 410 },
  { id: "detail7", img: detail7, url: "#", height: 370 },
  { id: "detail8", img: detail8, url: "#", height: 430 },
  { id: "detail9", img: detail9, url: "#", height: 400 },
  { id: "detail10", img: detail10, url: "#", height: 380 },
  { id: "detail11", img: detail11, url: "#", height: 420 },
  { id: "detail12", img: detail12, url: "#", height: 350 },
  { id: "detail13", img: detail13, url: "#", height: 450 },
  { id: "detail14", img: detail14, url: "#", height: 390 },
  { id: "detail15", img: detail15, url: "#", height: 410 },
  { id: "detail16", img: detail16, url: "#", height: 370 },
  { id: "detail17", img: detail17, url: "#", height: 430 },
  { id: "detail18", img: detail18, url: "#", height: 400 },
  { id: "detail19", img: detail19, url: "#", height: 380 },
  { id: "detail20", img: detail20, url: "#", height: 420 },
];

const MasonryTest = () => {
  return (
    <div className="w-full h-full">
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={false}
      />
    </div>
  );
};

export default MasonryTest;
