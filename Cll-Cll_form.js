const handle_CapitalLowerDrawnsix_Form = (message) => {

    let arrayWords = message.split(" ")

    let res = ""

    arrayWords.forEach(word=>{
    res = res+word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()+"-"
    })

    return res.slice(0, -1)
}



