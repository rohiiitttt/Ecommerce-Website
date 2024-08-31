from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

# Basic routes
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/home")
def home():
    return "this is the <b> Home Page </b>"

@app.route("/if-elif-else")
def conditionalRendering():
    value = 1
    if value == 2:
        return "the value is equal to 2"
    elif value < 2:
        return "the value is less than 2"
    else: 
        return "this is the <b> Home Page </b>"

@app.route("/inline-if")
def inlineIF():
    value = 1
    return f"this value is {value}"

@app.route("/inline-if-else")
def inlineIFElse():
    value = 1
    msg = "the value is equal to 1" if value == 1 else "the value is not equal to 1"
    return msg

# Loop examples
@app.route("/for-loop")
def forLoop():
    marks = [1, 2, 3, 4, 5, 6, 7, 8]
    totalMarks = 0
    
    for mark in marks:
        totalMarks += mark
    
    return {
        "status": 1,
        "message": "success",
        "payload": {
            'totalMarks': totalMarks,
            'value': marks
        }
    }

@app.route("/while-loop")
def whileLoop():
    value = 1
    counts = []
    
    while value < 10:
        value += 1
        counts.append(value)
    
    return {
        "status": 1,
        "message": "success",
        "payload": {
            'count': counts,
            'value': value
        }
    }

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
mdb = client.jagrati

@app.route("/db/read")
def read():
    userOne = mdb.users.find_one({"_id": 1}, {"_id": 0})
    
    users = mdb.users.find({"dept": "CSE"}, {'name': 1, '_id': 0})

    foundList = []
    for user in users:
        foundList.append(user)

    # Since the cursor `users` is already exhausted, create a new cursor or re-query for the second list
    users = mdb.users.find({"dept": "CSE"}, {'name': 1, '_id': 0})
    secondList = [user for user in users]

    print('user:', users)
    return {'foundList': foundList, "secondList": secondList, "userOne": userOne}

# Running the Flask app
if __name__ == "__main__":
    app.run(debug=True)
