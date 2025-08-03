import React , {useId} from 'react'
function InputBox({
    label, amount, onamountchange, oncurrencychange,
    currencyoptions = ["usd", "pkr", "eur", "gbp"],
    selectedcurrency = "usd",
    amountdisabled = false,
    currencydisabled = false,
    className = "",
}) {
    const id = useId();

    return (
        <div className={`bg-white/90 backdrop-blur-sm p-4 rounded-xl text-sm flex shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 ${className}`}>
            <div className="w-1/2 pr-2">
                <label className="text-gray-600 mb-2 inline-block font-medium text-xs uppercase tracking-wider" htmlFor={id}>
                    {label}
                </label>
                <input
                    className="outline-none w-full bg-transparent py-2 text-lg font-semibold text-gray-800 placeholder-gray-400"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => onamountchange && onamountchange(Number(e.target.value))}
                    disabled={amountdisabled}
                    id={id}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right pl-2 border-l border-gray-200">
                <p className="text-gray-600 mb-2 w-full font-medium text-xs uppercase tracking-wider">Currency</p>
                <select
                    className="rounded-lg px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 cursor-pointer outline-none border border-blue-200 text-blue-800 font-semibold hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
                    value={selectedcurrency}
                    onChange={(e) => oncurrencychange && oncurrencychange(e.target.value)}
                    disabled={currencydisabled}
                >
                    {currencyoptions.map((option) => (
                        <option key={option} value={option}>
                            {option.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
export default InputBox;
// This component renders an input box with a label and a currency selector.