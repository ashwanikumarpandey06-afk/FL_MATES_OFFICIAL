from flask import Flask, render_template

app = Flask(__name__)

# Mock Database for the website
esports_data = {
    "matches": 128,
    "teams": 12,
    "tournaments": 24,
    "news": 36
}

@app.route('/')
def home():
    return render_template('index.html', data=esports_data)

@app.route('/admin')
def admin():
    return render_template('admin.html', data=esports_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
