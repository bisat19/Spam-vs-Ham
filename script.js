let model;

// 1. Load model saat halaman dibuka
async function init() {
    console.log("Loading model...");
    try {
        // Sesuaikan path jika folder model Anda berbeda
        model = await tf.loadLayersModel('model/model.json');
        console.log("Model loaded!");
        document.getElementById('predict-btn').innerText = "Cek Pesan";
        document.getElementById('predict-btn').disabled = false;
    } catch (error) {
        console.error("Gagal memuat model:", error);
    }
}

// 2. Fungsi Prediksi
async function predict() {
    const inputText = document.getElementById('email-input').value;
    if (!inputText) return;

    // Bungkus teks ke dalam Tensor (karena model mengharapkan input batch)
    const inputTensor = tf.tensor([inputText]);

    // Jalankan inferensi
    const prediction = model.predict(inputTensor);
    const score = await prediction.data(); // Mendapatkan nilai probabilitas (0 sampai 1)

    // Tampilkan hasil
    const resultDiv = document.getElementById('result');
    if (score[0] > 0.5) {
        resultDiv.innerHTML = `<span class="text-danger">SPAM (Skor: ${(score[0] * 100).toFixed(2)}%)</span>`;
    } else {
        resultDiv.innerHTML = `<span class="text-success">SAFE (Skor: ${(score[0] * 100).toFixed(2)}%)</span>`;
    }
}

// Event Listener
document.getElementById('predict-btn').addEventListener('click', predict);
init();