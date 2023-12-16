const bot = './assets/bot.svg'
const user = './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')
let trieuChung = []
let trieuChung1 = []
let trieuChung2 = []
let id_benh = null
let ten = ''
let email = ''
let statusApp = 'hoiTen'

function cumA1() {
    init_message('Triệu chứng:\n' +
        '_ Sốt cao trên 38 độ, ớn lạnh.\n' +
        '_ Nhức đầu, chóng mặt, mệt mỏi, đau nhức cơ, biếng ăn, cơ thể suy nhược;\n' +
        '_ Đau họng, viêm họng, ho khan;\n' +
        '_ Hắt hơi, sổ mũi, nghẹt mũi, khó thở;\n' +
        '_ Buồn nôn, ói mửa và tiêu chảy.\n' +
        'Lời khuyên:\n' +
        '_ Đến gặp bác sĩ sớm nhất có thể để được khám và xét nghiệm chẩn đoán bệnh chính xác nhất\n' +
        '_ Nếu đang điều trị tại nhà theo chỉ định của bác sĩ, bạn hãy:\n' +
        '_ Nghỉ ngơi nhiều nhất có thể\n' +
        '_ Uống thuốc hạ sốt theo chỉ định\n' +
        '_ Uống nhiều nước, bổ sung đầy đủ chất dinh dưỡng, ăn đồ dễ tiêu hóa, hạn chế uống nước lạnh\n' +
        '_ Tắm nước ấm, bận quần áo nhẹ, thông thoáng\n' +
        '_ Dinh dưỡng đầy đủ và cách li tại nhà\n')
}

function cumA2() {
    init_message('Triệu chứng:\n' +
        '_ Sốt trên 38°C.\n' +
        '_ Cảm thấy rét run, mệt mỏi, choáng váng đầu óc.\n' +
        '_ Đau ngực, tim đập nhanh.\n' +
        '_ Đau họng, ho, thường ho khan, ho có đờm.\n' +
        '_ Chỉ sau nửa ngày, các triệu chứng do A/H5N1 trở nên trầm trọng. Người bệnh có biểu hiện suy hô hấp cấp như khó thở, thở nhanh, da tím tái. Các triệu chứng đi kèm là đau lan tỏa, mệt mỏi đặc biệt là đau đầu, đau nhức cơ, đau toàn thân, ý thức mê man.\n' +
        'Lời khuyên:\n' +
        '_ Đến gặp bác sĩ sớm nhất có thể\n' +
        '_ Nếu đang điều trị tại nhà theo chỉ định của bác sĩ, bạn hãy:\n' +
        '_ Nghỉ ngơi, thư giãn trong môi trường thoáng khí, tránh những nơi quá nóng hoặc quá lạnh và không nên ở phòng điều hòa\n' +
        '_ Dinh dưỡng đầy đủ, ăn các đồ dễ tiêu, thực phẩm lỏng, nóng và uống nhiều nước. Tránh ăn đồ lạnh\n' +
        '_ Sử dụng nước muối loãng để vệ sinh họng 2-3/ngày\n' +
        '_ Vệ sinh mũi bằng thuốc xịt mũi mỗi ngày\n')
}

function cumA3() {
    init_message('Triệu chứng:\n' +
        '_ Sốt cao 39 – 40°C.\n' +
        '_ Đau mỏi các khớp xương, buồn nôn, nôn, đau đầu.\n' +
        '_ Trong một số trường hợp, bệnh nhân có biểu hiện viêm long đường hô hấp trên như: sổ mũi, hắt hơi, đau họng…\n' +
        '_ Ho, tức ngực và khó thở tăng dần.\n' +
        '_ Các triệu chứng suy hô hấp như: tím môi, đầu chi, co kéo cơ hô hấp, thở nhanh.\n' +
        '_ Các biểu hiện nặng, nguy kịch, bao gồm: thiểu niệu hoặc vô niệu, suy tim, phù, đông máu nội quản rải rác, suy gan nặng, hôn mê…\n' +
        'Lời khuyên:\n' +
        '_ Bạn nên đến gặp bác sĩ để khám, cách li và xét nghiệm để chẩn đoán bệnh chính xác nhất và không nên tự ý điều trị ở nhà do loại cúm này có độc lực cao\n')
}

function cumB() {
    init_message('Giống như cúm A, vi rút cúm B cũng có thể bùng phát gây bệnh theo mùa. Về khác biệt, vi rút cúm B nói chung thay đổi chậm hơn về đặc tính di truyền và kháng nguyên so với cúm A. Vi rút cúm B chỉ gây bệnh ở người và không được phân chia theo loại như cúm A; cũng không gây ra những đợt lây nhiễm lớn.\n' +
        'Triệu chứng:\n' +
        '_ Hô hấp: ho, đau hoặc ngứa rát cổ họng, viêm họng, chảy nước mũi, hắt hơi liên tục\n' +
        'Sốt vừa đến sốt cao (trên 39 độ C, có thể lên tới 41 độ C), ớn lạnh toàn thân, mệt mỏi, chân tay không có lực, hoa mắt, đau đầu, đau nhức cơ, đau khi vận động\n' +
        'Buồn nôn và nôn, đau bụng, tiêu chảy, chán ăn, khô miệng, đau dạ dày\n' +
        'Lời khuyên:\n' +
        '_ Đến gặp bác sĩ sớm nhất có thể\n' +
        '_ Nếu đang điều trị tại nhà theo chỉ định của bác sĩ, bạn hãy:\n' +
        '_ Uống thuốc hạ sốt giảm đau, hạ sốt theo chỉ định\n' +
        '_ Nghỉ ngơi nhiều hơn, giữ không gian sống sạch sẽ, thoáng mát.\n' +
        '_ Uống nhiều nước, chia nhỏ các bữa ăn trong ngày.\n' +
        '_ Bổ sung các loại khoáng chất, vitamin\n')
}

function thuoc() {
    init_message('Tamiflu (oseltamivir phosphate) sử dụng điều trị triệu chứng cúm do virus gây ra ở người bệnh có triệu chứng ít hơn 2 ngày. Không tự ý sử dụng thuốc trong điều trị cảm lạnh thông thường. Nên bắt đầu dùng thuốc sớm ngay khi có những triệu chứng của bệnh cúm như: sốt, ớn lạnh, đau cơ, chảy nước mũi, nghẹt mũi, đau họng,… \n' +
        'Relenza (zanamivir): thuốc dạng hít dùng trong phòng ngừa và điều trị cúm. Thuốc có tác dụng làm giảm sự lây lan của virus cúm. Lưu ý, dạng hít chỉ sử dụng trong các trường hợp không có oseltamivir hoặc kháng với oseltamivir, cho bệnh nhân từ 5 tuổi trở lên. Một số tác dụng phụ thường gặp có thể bao gồm: đau đầu, tiêu chảy, buồn nôn, nôn, chóng mặt.\n' +
        'Các loại thuốc cũ như amantadine và rimantadine được phê duyệt trong phòng ngừa và điều trị cúm A.\n')
}

function benh() {
    init_message('Bạn muốn tím hiểu về bệnh gì?', [
        {
            message: 'Cúm A - H1N1',
            function: 'cumA1()'
        },
        {
            message: 'Cúm A - H5N1',
            function: 'cumA2()'
        },
        {
            message: 'Cúm A - H7N9',
            function: 'cumA3()'
        },
        {
            message: 'Cúm B',
            function: 'cumB()'
        },
    ])
}

function noi() {
    init_message('Tổ hợp Y tế Mediplus. Địa chỉ: 99 P. Tân Mai, Tân Mai, Hoàng Mai, Hà Nội\n' +
        'Bệnh viện Đa khoa Medlatec. Địa chỉ: Số 99 Trích Sài, Tây Hồ, Hà Nội\n' +
        'Hệ thống Y tế Thu Cúc TCI.  Địa chỉ: 216 Trần Duy Hưng, Cầu Giấy, Hà Nội\n' +
        'Phòng khám Đa khoa Medelab. Địa chỉ: 86-88 Nguyễn Lương Bằng, Chợ Dừa, Đống Đa, Hà Nội\n' +
        'Trung tâm xét nghiệm Y khoa Labhouse. Địa chỉ: Tòa D, Vinaconex 2, KĐT, Kim Văn, Hoàng Mai, Hà Nội\n' +
        'Bệnh viện Đa khoa Hồng Ngọc. địa chỉ : 55 P. Yên Ninh, Quán Thánh, Ba Đình, Hà Nội')
}

function traCuu() {
    init_message('Bạn muốn tìm hiểu gì về bệnh cúm', [
        {
            message: 'Thuôc trị bệnh cúm',
            function: 'thuoc()'
        },
        {
            message: 'Các loại bệnh cúm',
            function: 'benh()'
        },
        {
            message: 'Nơi điều trị',
            function: 'noi()'
        },
    ])
}

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
        init_message(`${ten} hình như bị cúm mất rồi, cùng tìm hiểu để xem cụ thể bạn bị cúm gì nhé!\nBạn cảm thấy các triệu chứng nào sau đây không?`,
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
    if (data.length > 1) {
        message += 'Dự đoan bạn có thể mắc 1 trong cái loại bệnh cúm sau: '
        for (let benh of data) {
            message += benh['tenBenh'] + ','
        }
        let list_predicted_disease = []
        for (let i of data) {
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
        let benh_chuan = await responseBw.json()
        message += `. Khả năng cao hơn bạn sẽ mắc bênh ${benh_chuan['benh']['tenBenh']}. Bạn nên làm theo lời khuyên sau: \n ${benh_chuan['benh']['loikhuyen']}
            Bạn có muốn nhận thêm thông tin về email, hãy nhập email của bạn.`
        statusApp = 'guiEmail'
        id_benh = benh_chuan['benh']['idbenh']
        init_message(message)
        console.log(benh_chuan)
    } else if (data.length == 1) {
        init_message('Bạn bị mắc bệnh cúm ' + data[0]['tenBenh'] + '. Bạn nên làm theo lời khuyên sau: \n' + data[0]['loikhuyen']
            + 'Bạn có muốn nhận thêm thông tin về email, hãy nhập email của bạn.')
        statusApp = 'guiEmail'
        id_benh = data[0]['idbenh']
    } else {
        init_message('Vậy bạn không có bị cúm đâu, chỉ hơi sốt chút xíu thôi.')
    }
}
const timBenh = async () => {
    const response = await fetch('http://127.0.0.1:5000/question1 ')

    const data = await response.json();

    init_message(`${ten}có triệu trứng nào sau đây không?`,
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
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId, options)

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId)

    await typeText(messageDiv, message, options, replies)
}

init_message("Có thể cho tôi biết tên bạn được không ?")

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

function chatStripe(isAi, value, uniqueId, option) {
    let a = ''
    if (!option) {
        a = 'wrap'
    }
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
                <div class="message ${a}" id=${uniqueId}>${value}</div>
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
    // const uniqueId = generateUniqueId()
    // chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (statusApp == 'hoiTen') {
        ten = data.get('prompt').trim()
        init_message(`Chào mừng ${ten} tới với chatbot tư vấn bệnh cúm ? Không biết tôi có thể giúp gì cho bạn ?`,
            [{
                message: 'Tôi nghi ngờ mình mắc bệnh cúm',
                function: 'timBenh()'
            }, {
                message: 'Tra cứu thông tin bệnh cúm',
                function: 'traCuu()'
            }])
    } else if (statusApp == 'guiEmail') {
        const response = await fetch('http://127.0.0.1:5000/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.get('prompt'),
                ten: ten,
                id_benh: id_benh,
                tt: trieuChung
            })
        })
        init_message('Tôi đã gửi thông tin về email bạn')
    }
    // specific message div
    // const messageDiv = document.getElementById(uniqueId)
    //
    // // messageDiv.innerHTML = "..."
    // loader(messageDiv)
    //
    // const response = await fetch('http://127.0.0.1:5000 ', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         prompt: data.get('prompt')
    //     })
    // })
    //
    // clearInterval(loadInterval)
    // messageDiv.innerHTML = " "
    //
    // if (response.ok) {
    //     const data = await response.json();
    //     const parsedData = data.reply.trim() // trims any trailing spaces/'\n'
    //
    //     typeText(messageDiv, parsedData)
    // } else {
    //     const err = await response.text()
    //
    //     messageDiv.innerHTML = "Something went wrong"
    //     alert(err)
    // }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})