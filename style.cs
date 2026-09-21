@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:linear-gradient(
        135deg,
        #0f172a,
        #1e293b,
        #0ea5e9
    );
    overflow:hidden;
}

body::before{
    content:'';
    position:absolute;
    width:300px;
    height:300px;
    background:#00ffff;
    border-radius:50%;
    filter:blur(120px);
    top:-100px;
    left:-100px;
}

body::after{
    content:'';
    position:absolute;
    width:300px;
    height:300px;
    background:#ff00ff;
    border-radius:50%;
    filter:blur(120px);
    bottom:-100px;
    right:-100px;
}

.chat-container{
    width:420px;
    height:700px;
    backdrop-filter:blur(20px);
    background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.15);
    border-radius:25px;
    overflow:hidden;
    box-shadow:
        0 0 20px rgba(0,255,255,.3),
        0 0 40px rgba(0,255,255,.2);
}

.chat-header{
    padding:20px;
    text-align:center;
    color:white;
    font-size:22px;
    font-weight:600;
    background:rgba(255,255,255,.05);
    border-bottom:1px solid rgba(255,255,255,.1);
}

.chat-header span{
    color:#00ffff;
}

.chat-box{
    height:560px;
    overflow-y:auto;
    padding:20px;
}

.chat-box::-webkit-scrollbar{
    width:5px;
}

.chat-box::-webkit-scrollbar-thumb{
    background:#00ffff;
    border-radius:20px;
}

