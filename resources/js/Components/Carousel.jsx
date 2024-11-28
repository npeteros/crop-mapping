import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full overflow-hidden rounded-lg h-[36rem]">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-full">
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="size-full object-fill"
                        />
                    </div>
                ))}
            </div>

            {/* Left Arrow */}
            <button
                onClick={goToPreviousSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 size-8 flex items-center justify-center rounded-full hover:bg-opacity-75 text-xl"
            >
                &#8249;
            </button>

            {/* Right Arrow */}
            <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 size-8 flex items-center justify-center rounded-full hover:bg-opacity-75 text-xl"
            >
                &#8250;
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? "bg-white" : "bg-gray-400"
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
