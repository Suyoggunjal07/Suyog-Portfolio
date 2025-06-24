from flask import Flask, request, jsonify

app = Flask(__name__)

DAX_TEMPLATES = {
    "SUM": lambda data: f"SUM({data['tables'][0]}[{data['columns'][0]}])",
    "RELATED": lambda data: f"RELATED({data['tables'][1]}[{data['columns'][0]}])",
    "CALCULATE": lambda data: (
        f"CALCULATE(SUM({data['tables'][0]}[{data['columns'][0]}]), "
        f"FILTER({data['tables'][1]}, {data['tables'][1]}[{data['columns'][1]}] = 'Value'))"
    )
}

@app.route("/generate_dax", methods=["POST"])
def generate_dax():
    data = request.json
    func = data.get("function")
    if func not in DAX_TEMPLATES:
        return jsonify({"error": "Unsupported function"}), 400
    try:
        dax = DAX_TEMPLATES[func](data)
        return jsonify({"dax": dax})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)