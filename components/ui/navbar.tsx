import React from 'react';

const Navbar: React.FC = () => {
  return (
    <>
        <nav className="bg-[var(--darkgreen)] font-[family-name:var(--font-montserrat)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a href="/nird/webcam">
                                <img className="h-12 w-12 cursor-pointer" src="/favicon.ico" alt="Logo" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="ml-4 flex items-center space-x-4">
                            <a href="/presentation" className="text-[var(--lightgreen)] hover:bg-[var(--softgreen)] rounded-lg p-2 transition-colors">Présentation</a>
                            <a href="/nird" className="text-[var(--lightgreen)] hover:bg-[var(--softgreen)] rounded-lg p-2 transition-colors">NIRD</a>
                            <a href="/contact" className="text-[var(--lightgreen)] hover:bg-[var(--softgreen)] rounded-lg p-2 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>  
    </>
    );
};

export default Navbar;