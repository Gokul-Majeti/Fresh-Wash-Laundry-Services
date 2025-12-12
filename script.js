    let buttons=document.querySelectorAll('.toggle');
    let cartBody = document.getElementById('cartbody');
    let emptyRow= document.getElementById('emptyRow');
    let  totalamount =   document.getElementById('totalamount');
    let message = document.querySelector(".message");

    let cart=[];

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const parent = btn.parentElement;
            const name = parent.getAttribute("data-name");
            const price = parseInt(parent.getAttribute("data-price"));

            
            const index = cart.findIndex((item) => item.name === name);

            if (index !== -1) {
                cart.splice(index, 1);
                btn.innerHTML = "Add Item &#8853;";
                btn.style.color='rgba(225, 83, 107, 1)'
                btn.style.backgroundColor= 'rgba(225, 83, 107, 0.284)';
            } else {
                message.innerText = "";
                cart.push({ name: name, price: price });
                btn.innerHTML = "Remove Item &#8854;";
                btn.style.backgroundColor='rgba(125, 229, 139, 0.23)'
                btn.style.color='rgba(16, 228, 44, 1)';
            }

            updateCartTable();
            updateTotal();
        });
    });

    function updateCartTable(){
        cartBody.querySelectorAll("tr:not(#emptyRow)").forEach(row => row.remove());
        if(cart.length===0)
        {
            emptyRow.style.display = "table-row";
            return;
        }
        emptyRow.style.display="none";
        cart.forEach((item,index)=>{
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>&#8377;${item.price}</td>
            `;
            cartBody.appendChild(row);
        })
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalamount.innerHTML = `&#8377;${total}`
    }

    const booknowbtn=document.querySelector(".bookbtn");
    booknowbtn.addEventListener("click", function (event) {
        event.preventDefault(); 

        message.innerText = "";
        message.style.color = "red";

        if (cart.length === 0) {
            message.innerText = "❌ Please add items to the cart before booking.";
            return;
        }
        let name = document.getElementById("bookname").value.trim();
        let email = document.getElementById("bookemail").value.trim();
        let phone = document.getElementById("bookphone").value.trim();
        if (!name || !email || !phone) {
        message.textContent = "❌ Please fill all booking details.";
        return;
        }
            if (name.length < 3) {
        message.innerText = "❌ Name must be at least 3 characters.";
        return;
        }

        
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            message.innerText = "❌ Please enter a valid email address.";
            return;
        }

        
        if (!/^[0-9]{10}$/.test(phone)) {
            message.innerText = "❌ Phone number must be 10 digits.";
            return;
        }

        let cartList = cart.map((item, i) => `${i + 1}. ${item.name} — ₹${item.price}`).join("\n");
        let totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
        message.style.color = "blue";
        message.innerText = "⏳ Sending booking request...";
        emailjs.send("service_edg2fah", "template_gase32k", {
            user_name: name,
            user_email: email,
            user_phone: phone,
            cart_items: cartList,
            total_price: totalAmount
        }).then(() => {
            message.style.color = "green";
            message.textContent = "✔ Thank you For Booking the Service We will get back to you soon!";

            cart = [];
            updateCartTable();
            updateTotal();

            buttons.forEach(btn => {
                btn.innerHTML = "Add Item &#8853;";
                btn.style.color = 'rgb(225, 83, 107)';
                btn.style.backgroundColor = 'rgba(225, 83, 107, 0.284)';
            });

        document.querySelector("form").reset();
        }).catch(() => {
            message.innerText = "❌ Error sending email. Try again later.";
            
        })
    });


    const subscribebtn=document.getElementById('subscribebtn');
    subscribebtn.addEventListener("click", function (event) {
        event.preventDefault(); 
        let subscribemsg = document.getElementById('subscribemsg');
        subscribemsg.innerText = "";
        let name = document.getElementById("newsname").value.trim();
        let email = document.getElementById("newsemail").value.trim();
        if (!name || !email ) {
        subscribemsg.textContent = "❌ Please fill all details.";
        return;
        }
            if (name.length < 3) {
        subscribemsg.innerText = "❌ Name must be at least 3 characters.";
        return;
        }


        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            subscribemsg.innerText = "❌ Please enter a valid email address.";
            return;
        }

        emailjs.send("service_edg2fah","template_l4gnr73", {
            user_name: name,
            user_email: email
        }).then(() => {
            subscribemsg.innerText= "✔ Thanks for subscribing. You will get info about all the updates.";
        document.getElementById('newsform').reset();
        }).catch(() => {
            subscribemsg.innerText = "❌ Error sending email. Try again later.";
            
        })
    })
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

