
const InfoExtra = () => {
    console.log('renderizando info');
    return (
        <div className="h-[210px] bg-septimo flex justify-around items-center my-10 gap-5">
            <div className="flex flex-col  items-center">
            <div className="border-3 rounded-full p-2 w-[75px] h-[75px] md:w-[110px] md:h-[110px] flex items-center justify-center">
                <i className="bi bi-truck text-[40px] md:text-[70px] "></i>
            </div>
                <h2 className="mt-2 text-[14px] md:text-[16px]">Envios gratis por correos andreani</h2>
            </div>
            <div className="flex flex-col  items-center">
                <div className="border-3 rounded-full p-2 w-[75px] h-[75px] md:w-[110px] md:h-[110px] flex items-center justify-center">
                <i class="bi bi-credit-card-2-back text-[40px] md:text-[70px]"></i>
                </div>
                <h2 className="mt-2 text-[14px] md:text-[16px]">Paga en 3, 6 y 12 cuotas</h2>
            </div>
            <div className="flex flex-col  items-center">
                <div className="border-3 rounded-full p-2 w-[75px] h-[75px] md:w-[110px] md:h-[110px] flex items-center justify-center">
                <i class="bi bi-shield-check text-[40px] md:text-[70px]"></i>
                </div>
                <h2 className="mt-2 text-[14px] md:text-[16px]">Cambios y devoluciones sin cargo</h2>
            </div>
        </div>
    )
}

export default InfoExtra;