// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const teachablemachine_URL = 'https://teachablemachine.withgoogle.com/models/6saBpDCpV/';
const modelURL = teachablemachine_URL + 'model.json';
const metadataURL = teachablemachine_URL + 'metadata.json';
const messageContainer =  document.getElementById('result-message');
let model, maxPredictions;

async function faceAnalyzation_predict(predictImage) {
    messageContainer.innerHTML = "";
    
    model = await tmImage.load(modelURL, metadataURL);
    
    var prediction = await model.predict(predictImage, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));

    // calculate prediction height !!
    var prediction_height = 0;
    for (var i = 0; i < prediction.length; i++) {
        prediction_height += parseInt(prediction[i].className) * prediction[i].probability;
    }
    prediction_height = Math.round((prediction_height - 5) * 100) / 100;
    var resultMessage =
        '당신은</br>' +
        prediction_height +
        'cm정도</br>되게 생기셨습니다. </br>' +
        randomEmoji(prediction_height);
    messageContainer.innerHTML = resultMessage;
}

function randomEmoji(height) {
    switch (true) {
        case height > 190:
            var list = new Array(
                '(͒ ˊ• ૢ·̫•ˋૢ)',
                '(՟ິͫઘ ՟ິͫ)',
                '( •̀.̫•́)✧',
                '❛ัᴗ❛',
                '(｡♋‸♋｡)',
                '( ͡° ͜ʖ ͡°)',
                '(ɔ ˘⌣˘)˘⌣˘ c)',
                '₍₍ (ง ˙ω˙)ว ⁾⁾',
                '( ･ิϖ･ิ)',
                '( ⌯᷄௰⌯᷅ )',
                '( ⁎ᵕᴗᵕ⁎ )',
                '( °ټ°)',
                '(๑ᵕ⌓ᵕ̤)',
                '(⚭◡⚭ )',
                '( ˇ͈ᵕˇ͈ )',
                '(｡･ω･｡)o',
                '˘◡˘',
                '(´͈ ᵕ `͈ )',
                'ʅ（´◔౪◔）ʃ',
                '(◔ิω◔ิ)',
                '(〃･ิ‿･ิ)ゞ',
                '(๑ᵕ⌓ᵕ̤)',
                '(･ิω･ิ)'
            );
            break;
        case height > 180:
            var list = new Array(
                "( ღ'ᴗ'ღ )",
                '◟( ˘ ³˘)◞ ♡',
                '(•ө•)♡',
                '(ฅ•ω•ฅ)♡',
                '( ்́ꇴ ்̀)♡',
                "ღ'ᴗ'ღ",
                '๑❤‿❤๑',
                '(๑˃̵ᴗ˂̵)و ♡',
                '꒰◍ˊ◡ˋ꒱੭ु⁾⁾♡',
                '(*ฅ́˘ฅ̀*)♡',
                '( ˇ͈ᵕˇ͈ ) ¨̮♡⃛',
                '(*ˊૢᵕˋૢ*)ෆ',
                '( ˃̆ૢ௰˂̆ૢഃ ) ლ',
                '٩(๑• ₃ -๑)۶♥',
                '(๑˃̵ᴗ˂̵)و ♡',
                'ʕ•ﻌ•ʔ ♡',
                'ღ˘‿˘ற꒱',
                'ෆ╹ .̮ ╹ෆ',
                "ლ|'ー'ლ|",
                'ლ( ╹ ◡ ╹ ლ)',
                '₍₍ ( ๑॔˃̶◡˂̶๑॓)◞♡⁰',
                '(✿◖◡​◗)❤'
            );
            break;
        case height > 170:
            var list = new Array(
                '( ⁼̴̤̆◡̶͂⁼̴̤̆ )',
                '(❁´▽`❁)',
                '(❀╹◡╹)',
                '(๑･̑◡･̑๑)',
                '❛◡ુ❛',
                "'◡'✿",
                '✦‿✦',
                '๑･̑◡･̑๑',
                '๑❛◡ુ❛๑',
                '꒰( ˵¯͒ꇴ¯͒˵ )꒱',
                '◕‿◕✿',
                '๑•‿•๑',
                '๑◕‿‿◕๑',
                '✪‿✪',
                '✿˘◡˘✿',
                'ღ˘‿˘ற꒱',
                '(▰˘◡˘▰)',
                '˘◡˘',
                '✿˘◡˘✿',
                '(๑′ᴗ‵๑)',
                '(∗❛⌄❛∗)',
                '(๑´◡ુ`๑)',
                'p(´∇｀)q',
                '๑•‿•๑',
                '(*´ ワ `*)“',
                'ξ(✿ ❛‿❛)ξ',
                '(๑・‿・๑)'
            );
            break;
        case height > 160:
            var list = new Array(
                '♪(´ε｀*)',
                '♪(*´θ｀)ノ',
                '°˖✧◝(⁰▿⁰)◜✧˖°',
                "o(*'▽'*)/☆ﾟ’",
                '٩(๑>∀<๑)۶',
                '( ๑˃̶ ꇴ ˂̶)♪⁺',
                '✧*.◟(ˊᗨˋ)◞.*✧',
                '⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾',
                '( ˃⍨˂̥̥ )',
                'ᕕ( ᐛ )ᕗ',
                'ᕙ(•̀‸•́‶)ᕗ',
                "٩( 'ω' )و",
                '(ง •̀_•́)ง',
                '(๑و•̀Δ•́)و',
                '٩(๑•̀o•́๑)و',
                '(๑ •̀ω•́)۶',
                '٩(`･ω･´)و ҉*',
                '(`•ω•´)/*҉',
                "٩( 'ω' )و ٩( 'ω' )",
                '✧ ☆ ٩(`･ω･´)و'
            );
            break;
        case height > 150:
            var list = new Array(
                'Σ(￣□￣;)',
                'へ(￣∇￣へ)',
                '( ｰ̀εｰ́ )✧*⁎',
                '꒰⑅ᵕ̆‧̯ᵕ̆⑅꒱',
                '(￣(ｴ)￣)ﾉ',
                '(*￣(ｴ)￣*)',
                '( •́ ̯•̀ )',
                'ಡ ̯ ಡ',
                'ｰ̀εｰ́',
                '๑ŐεŐ๑',
                '￣□￣',
                '(´･ʖ̫･`)',
                '๑°⌓°๑',
                '(ㅇ︿ㅇ)',
                '( •᷄⌓•᷅ )',
                '(｡•́︿•̀｡)',
                '๑°⌓°๑',
                '(ﾟヘﾟ)？',
                '(๑ӦㅅӦ๑)',
                '(•ε•；)'
            );
            break;
        case height < 150:
            var list = new Array(
                '⁺◟( ᵒ̴̶̷̥́ ·̫ ᵒ̴̶̷̣̥̀ )',
                'o̴̶̷᷄﹏o̴̶̷̥᷅',
                '(｡•́︿•̀｡)',
                'ಡ︷ಡ)',
                '(｡･ˇ_ˇ･｡)',
                '( Ĭ ^ Ĭ )',
                '(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)',
                '(ఠ ̥̆ ఠ)',
                '(๑ŏ╻ŏ๑)',
                '(๑°ㅁ°๑)‼✧',
                'ŏ̥̥̥̥םŏ̥̥̥̥',
                '(๑⊙ﾛ⊙๑)',
                '(๑•́o•̀๑)',
                '(оﾟдﾟо)',
                '(╬☉д⊙)',
                '(；◔д◔）',
                '๑•̀ㅁ•́ฅ✧',
                '٩(๑`^´๑)۶',
                '☄ฺ◣д◢)☄ฺ',
                '(╬◣д◢)'
            );
            break;
        default:
            var list = new Array('???');
    }
    return list[Math.floor(Math.random() * list.length)];
}