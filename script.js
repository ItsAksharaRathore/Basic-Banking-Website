const transactions = []; 

        const sendMoney = () => {
            const sender = document.getElementById("enterSName").value;
            const recipient = document.getElementById("enterName").value;
            const amount = parseFloat(document.getElementById("enterAmount").value);
            const senderBalanceElement = document.getElementById(`${sender.toLowerCase()}BankBalance`);
            const recipientBalanceElement = document.getElementById(`${recipient.toLowerCase()}BankBalance`);

            if (!senderBalanceElement || !recipientBalanceElement) {
                alert('Invalid sender or recipient.');
                return;
            }

            let senderBalance = parseFloat(senderBalanceElement.textContent);
            let recipientBalance = parseFloat(recipientBalanceElement.textContent);

            if (amount <= 0 || senderBalance < amount) {
                alert('Invalid transaction amount.');
                return;
            }

            senderBalance -= amount;
            recipientBalance += amount;

            senderBalanceElement.textContent = senderBalance;
            recipientBalanceElement.textContent = recipientBalance;

            const transactionTime = new Date().toLocaleString();
            transactions.push({ sender, recipient, amount, time: transactionTime });
            console.log(`Transaction: ${sender} sent ${amount} to ${recipient} at ${transactionTime}`);
        };

        const displayTransactions = () => {
            const transactionHistoryBody = document.getElementById("transaction-history-body");
            transactionHistoryBody.innerHTML = "";

            transactions.forEach((transaction, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = `Transaction ${index + 1}: ${transaction.sender} sent ${transaction.amount} to ${transaction.recipient} on ${transaction.time}`;
                transactionHistoryBody.appendChild(listItem);
            });
        };

        $('#transactionHistory').on('shown.bs.modal', displayTransactions);