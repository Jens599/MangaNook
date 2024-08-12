import pickle
from xmlrpc.client import boolean
from flask import Flask, jsonify, request
import pandas as pd
from tqdm import tqdm
import os

app = Flask(__name__)


# Load the similarity file with a progress bar
def load_large_file(file_path):
    file_size = os.path.getsize(file_path)
    chunk_size = 1024 * 1024  # 1 MB
    with open(file_path, "rb") as f, tqdm(
        total=file_size, unit="B", unit_scale=True, desc="Loading similarity file"
    ) as pbar:
        similarity_data = []
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            similarity_data.append(chunk)
            pbar.update(len(chunk))
    return pickle.loads(b"".join(similarity_data))


# Load the data file (assuming it's smaller and doesn't need a progress bar)
with open("./data/data.pkl", "rb") as f:
    manga = pickle.load(f)

# Load the similarity file with progress bar
similarity = load_large_file("./data/mat-20000.pkl")


def recommend(id):
    filter = manga[manga["manga_id"] == id]

    if filter.empty:
        return f"Manga with id {id} not found"

    index = filter.index[0]

    manga_by_similarity = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1]
    )

    recommendations = []

    for i in manga_by_similarity[:10]:
        recommendations.append(
            {
                "id": f"{manga.iloc[i[0]]["manga_id"]}",
                "similarity": f"{round(i[1] * 100,1)}%",
            }
        )

    return recommendations


@app.route("/recommendManga", methods=["POST"])
def recommendManga():
    query = request.json["query"]  # type: ignore
    return jsonify(recommend(int(query)))


if __name__ == "__main__":
    app.run()
