import re

# ==========================================================
# KPTM ALOR SETAR - DATABASE
# Awak boleh tambah/edit maklumat dekat sini
# ==========================================================

KPTM_DATA = {

    "umum": {
        "keywords": [
            "kptm",
            "kolej poly tech mara",
            "kolej poly-tech mara"
        ],
        "answer": """
KPTM Alor Setar ialah salah satu kampus Kolej Poly-Tech MARA
yang terletak di Alor Setar, Kedah, Malaysia.

KPTM menyediakan pelbagai program pengajian dan kemudahan
untuk membantu pelajar dalam pembelajaran serta perkembangan
akademik dan kemahiran.
"""
    },

    "lokasi": {
        "keywords": [
            "lokasi",
            "alamat",
            "kat mana",
            "di mana",
            "tempat",
            "kawasan"
        ],
        "answer": """
KPTM Alor Setar terletak di:

Kompleks Perniagaan MARA,
Seberang Jalan Putra,
05150 Alor Setar,
Kedah, Malaysia.

Kampus ini berada di kawasan Alor Setar dan boleh diakses
menggunakan pengangkutan darat.
"""
    },

    "program": {
        "keywords": [
            "program",
            "course",
            "kursus",
            "jurusan",
            "belajar apa",
            "ada course"
        ],
        "answer": """
Antara program yang ditawarkan di KPTM Alor Setar ialah:

• Diploma in Computer Science
• Diploma in Information Technology
• Diploma in Accounting
• Diploma in Business Management
• Diploma in Office Management
• Diploma in Tourism Management

Setiap program mempunyai bidang pembelajaran dan syarat
kemasukan yang berbeza.
"""
    },

    "computer_science": {
        "keywords": [
            "computer science",
            "sains komputer",
            "cs",
            "coding",
            "programming",
            "pengaturcaraan"
        ],
        "answer": """
Ya, KPTM Alor Setar menawarkan Diploma in Computer Science.

Program ini berkaitan dengan bidang komputer dan teknologi.
Antara topik yang boleh dipelajari ialah pengaturcaraan,
pangkalan data, pembangunan web, pembangunan aplikasi,
rangkaian dan teknologi komputer.

Program ini sesuai untuk pelajar yang berminat dengan
komputer, coding dan teknologi.
"""
    },

    "it": {
        "keywords": [
            "information technology",
            "teknologi maklumat",
            "it course",
            "course it"
        ],
        "answer": """
KPTM Alor Setar turut menawarkan program Diploma in
Information Technology.

Program ini memberi pendedahan kepada bidang teknologi
maklumat, sistem komputer dan penggunaan teknologi untuk
menyelesaikan masalah dalam dunia sebenar.
"""
    },

    "asrama": {
        "keywords": [
            "asrama",
            "hostel",
            "penginapan",
            "tempat tinggal",
            "duduk"
        ],
        "answer": """
KPTM Alor Setar menyediakan kemudahan asrama untuk pelajar.

Asrama dapat membantu pelajar mendapatkan tempat tinggal
yang lebih dekat dengan kampus dan memudahkan urusan
kehadiran ke kelas.

Kekosongan dan syarat penginapan bergantung kepada pihak
pengurusan KPTM.
"""
    },

    "kemudahan": {
        "keywords": [
            "kemudahan",
            "facilities",
            "wifi",
            "surau",
            "ruang belajar"
        ],
        "answer": """
Antara kemudahan yang berkaitan dengan pelajar termasuk:

• WiFi
• Ruang belajar
• Surau
• Kemudahan asrama
• Kemudahan pelajar

Kemudahan yang tersedia membantu pelajar menjalankan
aktiviti pembelajaran dan kehidupan harian di kampus.
"""
    },

    "yuran": {
        "keywords": [
            "yuran",
            "fee",
            "bayaran",
            "harga",
            "kos",
            "berapa"
        ],
        "answer": """
Yuran pengajian bergantung kepada program yang dipilih.

Jumlah bayaran boleh berbeza mengikut program dan sesi
pengambilan. Selain yuran pengajian, pelajar juga mungkin
perlu mengambil kira kos seperti penginapan, makanan,
pengangkutan dan keperluan pembelajaran.

Untuk jumlah yuran yang tepat, sila rujuk maklumat rasmi
KPTM bagi program yang berkenaan.
"""
    },

    "kemasukan": {
        "keywords": [
            "kemasukan",
            "syarat",
            "masuk kptm",
            "nak masuk",
            "permohonan",
            "mohon",
            "daftar",
            "pendaftaran"
        ],
        "answer": """
Untuk kemasukan ke KPTM, pemohon perlu memenuhi syarat
kemasukan bagi program yang dipilih.

Syarat kemasukan bergantung kepada program dan kelayakan
akademik pemohon.

Pemohon perlu menyemak syarat program terlebih dahulu
sebelum membuat permohonan dan pendaftaran.
"""
    },

    "hubungi": {
        "keywords": [
            "telefon",
            "contact",
            "hubungi",
            "nombor",
            "email",
            "emel"
        ],
        "answer": """
Untuk mendapatkan maklumat terkini mengenai KPTM Alor Setar,
pengguna boleh menghubungi pihak KPTM melalui saluran
hubungan rasmi.

Pihak KPTM boleh membantu memberikan maklumat berkaitan
program pengajian, kemasukan, yuran, pendaftaran, asrama
dan perkara lain yang berkaitan dengan kampus.
"""
    }
}


# ==========================================================
# FUNGSI BERSIHKAN SOALAN
# ==========================================================

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text


# ==========================================================
# FUNGSI CARI JAWAPAN
# ==========================================================

def search_kptm(question):

    question = clean_text(question)

    best_category = None
    best_score = 0

    for category, data in KPTM_DATA.items():

        score = 0

        for keyword in data["keywords"]:

            keyword = clean_text(keyword)

            if keyword in question:
                score += 1

        if score > best_score:
            best_score = score
            best_category = category

    if best_category is not None:
        return KPTM_DATA[best_category]["answer"]

    return """
Maaf, saya belum mempunyai maklumat yang sesuai untuk
menjawab soalan tersebut.

Anda boleh bertanya tentang:

• Program pengajian
• Computer Science
• Information Technology
• Yuran
• Kemasukan
• Asrama
• Kemudahan
• Lokasi KPTM
• Maklumat hubungan
"""


# ==========================================================
# CHATBOT
# ==========================================================

print("=" * 60)
print("          KPTM ALOR SETAR AI ASSISTANT")
print("=" * 60)

print("""
Selamat datang! 👋

Saya boleh membantu menjawab soalan umum mengenai
KPTM Alor Setar.

Contoh:
- KPTM Alor Setar dekat mana?
- Ada course Computer Science tak?
- Ada asrama?
- Apa program yang ditawarkan?
- Macam mana nak masuk KPTM?

Taip 'exit' untuk keluar.
""")

while True:

    question = input("Anda: ")

    if question.lower().strip() == "exit":
        print("\nAI: Terima kasih kerana menggunakan KPTM AI Assistant!")
        break

    if question.strip() == "":
        print("AI: Sila masukkan soalan.")
        continue

    answer = search_kptm(question)

    print("\nAI:", answer)