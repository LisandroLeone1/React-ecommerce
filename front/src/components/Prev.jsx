const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} left-0 z-1000 text-black hover:text-blue-500`}
        onClick={onClick}
      >                 <div key={producto.id}
      onMouseEnter={() => setButtonVisible(producto.id)}
      onMouseLeave={() => setButtonVisible(null)}
      className={`relative rounded-lg border border-gray-300 bg-white overflow-hidden transition-all duration-300 
      ease-in-out hover:shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:z-[1] ${buttonVisible === producto.id ? 'h-[464px]' : 'h-[415px]'}`
      }>
         <div className="grid justify-center mt-[30px] gap-[30px] my-[20px] grid-cols-[repeat(auto-fit,_270px)] auto-rows-[415px]"></div>
        <i className="bi bi-chevron-left text-4xl"></i>
      </div>
    );
  };
 
  export default SamplePrevArrow;