import CircularGallery from '../ui/CircularGallery'

const GalleryTest = () => {
  // Check if it's mobile view
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery 
        bend={isMobile ? 1.5 : 2} 
        textColor={isMobile ? "transparent" : "#ffffff"} 
        borderRadius={0.05} 
        scrollEase={isMobile ? 0.005 : 0.01}
        scrollSpeed={isMobile ? 0.5 : 1}
      />
    </div>
  );
};

export default GalleryTest;