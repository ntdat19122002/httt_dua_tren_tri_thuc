import smtplib
import textwrap

from flask import Flask, render_template, request
from flask_cors import CORS
from class_all import *
from class_all_ptit import ConvertData

from backward_chaining import BackwardChaining
from forward_chaining import ForwardChaining

from email.message import EmailMessage
import ssl, smtplib

validate = Validate()

app = Flask(__name__)
CORS(app)

db = ConvertData()
db.convertbenh()  # bang benh
db.converttrieuchung()  # bang trieu chung
db.getfc()
db.getbc()
luat_lui = db.groupbc()
luat_tien = db.groupfc()


@app.route("/", methods=['POST'])
def hello_world():
    return {
        'reply': 'test thu xem con bot tra loi the nào b'
    }


@app.route("/question1")
def question1():
    return tra_ve_tt_cho_fe(['S07', 'S17', 'S13', 'S22', 'S18'], 'addTt', 'reply1')


@app.route("/question2")
def question2():
    return tra_ve_tt_cho_fe(['S08','S10','S03', 'S05', 'S16', 'S12', 'S21', 'S17'], 'addTt2', 'reply2')


@app.route("/forward_chaining", methods=['POST'])
def tien_hanh_forward_chaining():
    benh_du_doan_list = []
    for i in forward_chaining(luat_tien, request.json['tt'], None, 'ex'):
        temp = db.get_benh_by_id(i)
        benh_du_doan_list.append(temp)
    return benh_du_doan_list


@app.route("/backward_chaining", methods=['POST'])
def tien_hanh_backwarddf_chaining():
    benh_du_doan_list = backward_chaining(luat_lui, request.json['tt'], request.json['list_predicted_disease'], "ex")
    print(benh_du_doan_list)
    return benh_du_doan_list

@app.route('/wtf',methods=['POST'])
def ok():
    return {}

@app.route("/send_email", methods=['POST'])
def send_email():
    email_sender = 'anhcv10@gmail.com'
    email_password = 'bpfmjpsvurfhnmdx'
    email_receiver = request.json['email']
    print(email_receiver)

    benh = {}
    benh = db.get_benh_by_id(request.json['id_benh'])
    # print(benh)
    if benh == 0:
        pass
    else:
        nguyen_nhan = benh['nguyennhan']
        loi_khuyen = benh['loikhuyen']
        subject = 'Medical records'
        body = textwrap.dedent(f"""
Xin chào {request.json['ten']}
Chúng tôi nhận được các triệu chứng bạn đã gặp phải là :
{[db.get_trieuchung_by_id(i)["noidung"] for i in request.json['tt']]}
Chúng tôi dự đoán bạn bị bệnh : {benh['tenBenh']}
Nguyên nhân gây ra bệnh là:
{nguyen_nhan}
Lời khuyên của chúng tôi dành cho bạn:
{loi_khuyen}
Rất vui khi được giúp đỡ bạn
            """)
        # print(body)

        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)
        context = ssl.create_default_context()

        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=ssl.create_default_context()) as smtp:
                smtp.login(email_sender, email_password)

                # Encode the email body using UTF-8
                body_utf8 = body.encode('utf-8')

                msg = EmailMessage()
                msg.set_content(body_utf8.decode('utf-8'))  # Decode for setting the content
                msg['From'] = email_sender
                msg['To'] = email_receiver
                msg['Subject'] = subject

                # Send the email with the encoded content
                smtp.sendmail(email_sender, email_receiver, msg.as_bytes())
        except Exception as e:  # Use "except" instead of "exption"
            print(f"An error occurred: {e}")
    return {}


def forward_chaining(rule, fact, goal, file_name):
    fc = ForwardChaining(rule, fact, None, file_name)

    list_predicted_disease = [i for i in fc.facts if i[0] == "D"]
    print(
        f'-->Chatbot: Chúng tôi dự đoán bạn có thể bị bệnh :', end=" ")
    for i in list_predicted_disease:
        temp = db.get_benh_by_id(i)
        print(temp['tenBenh'], end=', ')

    print(
        f'-->Chatbot: Trên đây là chuẩn đoán sơ bộ của chúng tôi. Tiếp theo, chúng tôi sẽ hỏi ban một số câu hỏi để đưa ra kết quả chính xác.',
        end=" ")
    return list_predicted_disease


def tra_ve_tt_cho_fe(tt_list, func, id):
    data = []

    for tt in tt_list:
        a = [d for d in db.resulttrieutrung if d['idtrieuchung'] == tt]
        data.append({
            'message': a[0]['noidung'],
            'function': f"{func}(this, '{tt}', '{id}')"
        })
    return data


def backward_chaining(luat_lui, list_symptom_of_person_id, list_predicted_disease, file_name):
    predictD = list_predicted_disease
    rule = luat_lui
    all_rule = db.gettrieuchung()
    fact_real = list_symptom_of_person_id
    benh = 0
    for g in predictD:
        goal = g
        D = db.get_benh_by_id(goal)  # Chứa thông tin của bệnh có id == goal
        print(
            f"Chúng tôi đã có các triệu chứng ban đầu và có thể bạn mắc bệnh {D['tenBenh']}({goal}) , sau đây chúng tôi muốn hỏi bạn một vài câu hỏi để tìm hiểu về bệnh bạn đang mắc phải")
        all_s_in_D = all_rule[goal]
        all_s_in_D = sorted(set(all_s_in_D) - set(fact_real))
        d = searchindexrule(rule, goal)

        b = BackwardChaining(rule, fact_real, goal,
                             file_name)  # kết luận trong trường hợp các luât jtruwowsc đã suy ra đk luôn

        if b.result1 == True:  # đoạn đầu
            print("Bạn mắc bệnh {}- {}và chúng tôi sẽ gửi thêm thông tin về bệnh này cho bạn qua mail".format(goal, D[
                'tenBenh']))
            print(f"Lời khuyên")
            D['loikhuyen'] = D['loikhuyen'].replace("/n", "\n")
            print(f"{D['loikhuyen']}")
            print("Cám ơn bạn đã sử dụng chat bot của chúng tôi")
            return {
                'benh': db.get_benh_by_id(goal),
                'tt': fact_real
            }

        while (len(all_s_in_D) > 0):
            s = db.get_trieuchung_by_id(all_s_in_D[0])
            question = f"Bạn có bị triệu chứng {s['noidung']}({all_s_in_D[0]}) không?"
            print(question)
            answer = validate.validate_binary_answer(input())

            print(f"answer: {answer}")
            if answer == True:
                fact_real.append(all_s_in_D[0])
                b = BackwardChaining(rule, fact_real, goal, file_name)
                list_no_result, lsD = get_s_in_d(all_s_in_D[0], goal, rule, d, 1)
                d = sorted(set(d) - set(lsD))
                all_s_in_D = sorted(set(list_no_result) - set(fact_real))
                if b.result1 == True:
                    benh = 1
                    break
            if answer == False:
                list_no_result, lsD = get_s_in_d(all_s_in_D[0], goal, rule, d, 0)  # S01 S02 S03 S04 S05
                d = sorted(set(d) - set(lsD))
                all_s_in_D = sorted(set(list_no_result) - set(fact_real))
            if len(d) == 0:
                print(f"Có vẻ như bạn không mắc bệnh {goal}-{D['tenBenh']}")
                break
        if benh == 1:
            print("Bạn mắc bệnh {}- {} , và chúng tôi sẽ gửi thêm thông tin về bệnh này cho bạn qua mail".format(goal,
                                                                                                                 D[
                                                                                                                     'tenBenh']))
            print(f"Lời khuyên")
            D['loikhuyen'] = D['loikhuyen'].replace("/n", "\n")
            print(f"{D['loikhuyen']}")
            print("Cám ơn bạn đã sử dụng chat bot của chúng tôi")

            return {
                'benh':db.get_benh_by_id(goal),
                'tt': fact_real
            }
    if benh == 0:
        print(f"Bạn không bị bệnh nào cả")
        return None, fact_real


if __name__ == '__main__':
    app.run()
