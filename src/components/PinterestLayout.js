import React,{useRef,useState,useEffect} from 'react';
import images from '../asset/data.js';  
import { Vertical_image_loaded } from './Vertical_image_loaded.js';
function PinterestLayout() { 
    const [Hole_images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const containerRef = useRef(null);
  
    useEffect(() => {
      const loadImages = async () => {
        setLoading(true);
        // Replace this URL with your API or method to fetch images
        const newImages = images.splice(page*20-20,page*20)
        setImages(prevImages => [...prevImages, ...newImages]);
        setLoading(false);
      };
  
      loadImages();
    }, [page]);
  
    const handleScroll = () => {
      const container = containerRef.current;
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
        setPage(prevPage => prevPage + 1);
      }
    };
  
    useEffect(() => {
      const container = containerRef.current;
      container.addEventListener('scroll', handleScroll);
  
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }, []);
  

  return (
    <div style={{height:"100vh",width:'100vw'}}>
    <section ref={containerRef} style={{width:"100%",height:"100%",overflowY:'scroll'}}>
    <div style={styles.pin_container}>
      {
        Hole_images.map((item,index)=>(
          <Vertical_image_loaded key={`vertical_layout_image_${index}`} item={item} index={index} />
        ))
      }
    </div>
    </section>
    </div>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 33%)', 
    justifyContent: 'center',
    backgroundColor: 'black', 
  },
};

export default PinterestLayout;
