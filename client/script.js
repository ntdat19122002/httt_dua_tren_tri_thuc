const bot = './assets/bot.svg'
const user = './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')
let trieuChung = []
let trieuChung1 = []
let trieuChung2 = []

function addTt(e, tt, id) {
    if (e.classList.contains("picked")) {
        e.classList.remove("picked")
        trieuChung1.splice(trieuChung.indexOf('picked'), 1)
    } else {
        e.classList.add("picked")
        trieuChung1.push(tt)
    }

    if (trieuChung1.length > 0) {
        document.getElementById(id).innerHTML = 'Tôi cảm thấy các triệu chứng trên 🙁'
        document.getElementById(id).classList.add('havett')
    } else {
        document.getElementById(id).innerHTML = 'Tôi không cảm thấy triệu chứng nào như trên 😄'
        document.getElementById(id).classList.remove('havett')
    }
}

function addTt2(e, tt, id) {
    if (e.classList.contains("picked")) {
        e.classList.remove("picked")
        trieuChung2.splice(trieuChung.indexOf('picked'), 1)
    } else {
        e.classList.add("picked")
        trieuChung2.push(tt)
    }

    if (trieuChung2.length > 0) {
        document.getElementById(id).innerHTML = 'Tôi cảm thấy các triệu chứng trên 🙁'
        document.getElementById(id).classList.add('havett')
    } else {
        document.getElementById(id).innerHTML = 'Tôi không cảm thấy triệu chứng nào như trên 😄'
        document.getElementById(id).classList.remove('havett')
    }
}

const reply1 = async () => {
    console.log(trieuChung1)
    a = 0
    if (trieuChung1.includes('S07')) a++
    if (trieuChung1.includes('S17')) a++
    if (trieuChung1.includes('S27')) a++
    if (trieuChung1.length <= 2 || a < 2) {
        init_message('Bạn không có bi bệnh cúm đâu, đừng lo nha!')
    } else {
        trieuChung = trieuChung.concat(trieuChung1)
        const response = await fetch('http://127.0.0.1:5000/question2')

        const data = await response.json();
        init_message('Bạn bị cúm mất rồi, cùng tìm hiểu để xem cụ thể bạn bị cúm gì nhé!\nBạn cảm thấy các triệu chứng nào sau đây không?',
            data,
            [{
                id: 'reply2',
                function: 'reply2()',
                message: 'Tôi không cảm thấy triệu chứng nào như trên 😄'
            }]);

    }
}

const reply2 = async () => {
    trieuChung = trieuChung.concat(trieuChung2)
    const response = await fetch('http://127.0.0.1:5000/forward_chaining', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tt: trieuChung
        })
    })

    const data = await response.json();
    let message = ''
    if (data.length > 1){
        message += 'Dự đoan bạn có thể mắc 1 trong cái loại bệnh cúm sau: '
        for (let benh of data){
            message += benh['tenBenh'] + ','
        }
        let list_predicted_disease = []
        for(let i of data){
            list_predicted_disease.push(i['idbenh'])
        }
        const responseBw = await fetch('http://127.0.0.1:5000/backward_chaining', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tt: trieuChung,
                list_predicted_disease: list_predicted_disease
            })
        })
        init_message(message)
        console.log(responseBw.json())
    }else if (data.length==1){
        init_message('Bạn bị mắc bệnh cúm ' + data[0]['tenBenh'])
    }else{
        init_message('Chưa có đủ dữ liệu. Bản trả lời thêm các câu hỏi nhé')
    }
}
const timBenh = async () => {
    const response = await fetch('http://127.0.0.1:5000/question1 ')

    const data = await response.json();

    init_message('Bạn có triệu trứng nào sau đây không?',
        data,
        [{
            id: 'reply1',
            function: 'reply1()',
            message: 'Tôi không cảm thấy triệu chứng nào như trên 😄'
        }]);


}

const typeText = async (element, text, options, replies) => {
    let index = 0

    let interval = await setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
            if (options) {
                const uniqueId = generateUniqueId()
                element.innerHTML += `
                    <div class="options" id=${uniqueId}>
                    
                    </div>
            `
                const optionsDiv = document.getElementById(uniqueId)


                for (let option of options) {
                    optionsDiv.innerHTML += `<div class="option" onclick="${option.function}">${option.message}</div>`
                }

                // Make reply
                if (replies) {

                    const uniqueReplyId = generateUniqueId()
                    element.innerHTML += `
                    <div class="replies" id=${uniqueReplyId}>
                    
                    </div>
            `
                    const repliesDiv = document.getElementById(uniqueReplyId)


                    for (let reply of replies) {
                        repliesDiv.innerHTML += `<div class="reply" id=${reply.id} onclick="${reply.function}">${reply.message}</div>`
                    }
                }
            }

        }
    }, 0)
}

let loadInterval

const init_message = async (message, options, replies) => {
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId)

    await typeText(messageDiv, message, options, replies)
}

init_message('Chào mừng bạn tới với chatbot tư vấn bệnh cúm ? Không biết tôi có thể giúp gì cho bạn ?',
    [{
        message: 'Tôi nghi ngờ mình mắc bệnh cúm',
        function: 'timBenh()'
    }, {
        message: 'Tra cứu thông tin bệnh cúm',
        function: ''
    }])


function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('http://127.0.0.1:5000 ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.reply.trim() // trims any trailing spaces/'\n'

        typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})