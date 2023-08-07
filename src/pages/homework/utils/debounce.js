function debounce(func, gap) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() =>{
            func.apply(this, args)
        },gap)
    }
}

export default debounce