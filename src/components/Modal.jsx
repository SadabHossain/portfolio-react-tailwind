import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div id="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover">
            <div className="bg-auto rounded-xl p-6 max-w-md w-full shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="container mx-auto max-w-5xl">
                    {/* <h2 className="text-3xl md:text-4xl font-bold mb-4 text-left">
                        <span className="text-primary"> Projects </span>
                    </h2> */}

                    <h3 className="text-xl font-semibold mb-1"><span className="text-primary"> {children.title}</span></h3>
                    <h3 className="text-xl font-semibold mb-1"> 🔧 Project Overview</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        {children.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {children.tags.map((tag) => (
                            <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                     {/* <h3 className="text-xl font-semibold mb-1"> Start {children.start} & End {children.end} </h3> */}
                </div>
            </div>
            </div>
        </div>
    );
};

export default Modal;