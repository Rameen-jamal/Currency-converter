import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/usecurrencyinfo'
import './App.css'

function App() {
    const [amount, setamount] = useState(0);
    const [from, setfrom] = useState('usd');
    const [to, setto] = useState('pkr');
    const [convertedAmount, setconvertedAmount] = useState(0);
    const currencyData = useCurrencyInfo(from);
    const currencyOptions = Object.keys(currencyData);

    const swap = () => {
        const temp = from;
        setfrom(to);
        setto(temp);
        setconvertedAmount(amount);
        setamount(convertedAmount);
    };

    const convert = () => {
        if (currencyData[to]) {
            setconvertedAmount(Number(amount) * currencyData[to]);
        } else {
            setconvertedAmount(0);
        }
    };

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-center relative overflow-hidden"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            }}
        >
            {/* Gradient overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"></div>
            
            <div className="w-full relative z-10">
                <div className="w-full max-w-lg mx-auto">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            💱 Currency Converter
                        </h1>
                        <p className="text-white/80 text-lg">
                            Real-time exchange rates at your fingertips
                        </p>
                    </div>

                    {/* Main converter card */}
                    <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-5 shadow-2xl border border-white/20">
                        <div>
                            <div className="w-full mb-3">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    onamountchange={(amount) => setamount(Number(amount))}
                                    oncurrencychange={(currency) => setfrom(currency)}
                                    currencyoptions={currencyOptions}
                                    selectedcurrency={from}
                                />
                            </div>

                            <div className="relative w-full h-1 mb-4">
                                <button
                                    type="button"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg border-4 border-white transition-all duration-300 transform hover:scale-110 hover:rotate-180"
                                    onClick={swap}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </div>

                            <div className="w-full mb-6">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    oncurrencychange={(currency) => setto(currency)}
                                    currencyoptions={currencyOptions}
                                    selectedcurrency={to}
                                    amountdisabled={true}
                                />
                            </div>

                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    convert();
                                }}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                            >
                                Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                        </div>

                        {/* Exchange rate info */}
                        {currencyData[to] && (
                            <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
                                <div className="text-center text-white">
                                    <p className="text-sm opacity-80 mb-1">Current Exchange Rate</p>
                                    <p className="text-lg font-semibold">
                                        1 {from.toUpperCase()} = {currencyData[to]?.toFixed(4)} {to.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className="text-white/60 text-sm">
                            Powered by real-time currency API
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;