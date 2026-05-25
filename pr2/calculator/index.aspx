<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="calculator.aspx.cs" Inherits="calculator" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Calculator - ASP.NET</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-attachment: fixed;
        }
        .calculator {
            background: #2c3e50;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            padding: 25px;
            width: 340px;
        }
        .display {
            background: #1a252f;
            color: #ecf0f1;
            font-size: 2.5em;
            font-weight: 300;
            text-align: right;
            padding: 25px 20px;
            margin-bottom: 20px;
            border-radius: 15px;
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
            min-height: 40px;
            word-wrap: break-word;
            overflow: hidden;
            border: none;
            width: calc(100% - 40px);
            font-family: inherit;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }
        .btn {
            background: #34495e;
            border: none;
            color: #ecf0f1;
            font-size: 1.4em;
            padding: 18px 0;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.15s ease;
            box-shadow: 0 4px 0 #1a252f, 0 5px 10px rgba(0,0,0,0.3);
            text-align: center;
            outline: none;
        }
        .btn:active {
            transform: translateY(3px);
            box-shadow: 0 1px 0 #1a252f, 0 2px 5px rgba(0,0,0,0.3);
        }
        .btn.operator {
            background: #e67e22;
            box-shadow: 0 4px 0 #a04017, 0 5px 10px rgba(0,0,0,0.3);
        }
        .btn.equals {
            background: #27ae60;
            box-shadow: 0 4px 0 #1e7b42, 0 5px 10px rgba(0,0,0,0.3);
            grid-column: span 2;
        }
        .btn.clear {
            background: #c0392b;
            box-shadow: 0 4px 0 #8b1a1a, 0 5px 10px rgba(0,0,0,0.3);
            grid-column: span 2;
        }
        .btn:hover {
            filter: brightness(1.1);
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="calculator">
            <!-- Display TextBox -->
            <asp:TextBox ID="txtDisplay" runat="server" CssClass="display" ReadOnly="true" Text="0"></asp:TextBox>
            
            <div class="buttons">
                <!-- Row 1 -->
                <asp:Button ID="btnClear" runat="server" Text="AC" CssClass="btn clear" OnClientClick="clearDisplay(); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnBack" runat="server" Text="⌫" CssClass="btn operator" OnClientClick="backspace(); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnPercent" runat="server" Text="%" CssClass="btn operator" OnClientClick="appendOperator('%'); return false;" UseSubmitBehavior="false" />

                <!-- Row 2 -->
                <asp:Button ID="btn7" runat="server" Text="7" CssClass="btn" OnClientClick="appendNumber('7'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btn8" runat="server" Text="8" CssClass="btn" OnClientClick="appendNumber('8'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btn9" runat="server" Text="9" CssClass="btn" OnClientClick="appendNumber('9'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnDivide" runat="server" Text="÷" CssClass="btn operator" OnClientClick="appendOperator('/'); return false;" UseSubmitBehavior="false" />

                <!-- Row 3 -->
                <asp:Button ID="btn4" runat="server" Text="4" CssClass="btn" OnClientClick="appendNumber('4'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btn5" runat="server" Text="5" CssClass="btn" OnClientClick="appendNumber('5'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btn6" runat="server" Text="6" CssClass="btn" OnClientClick="appendNumber('6'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnMultiply" runat="server" Text="×" CssClass="btn operator" OnClientClick="appendOperator('*'); return false;" UseSubmitBehavior="false" />

                <!-- Row 4 -->
                <asp:Button ID="btn1" runat="server" Text="1" CssClass="btn" OnClientClick="appendNumber('1'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btn2" runat="server" Text="2" CssClass="btn" OnClientClick="appendNumber('2'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btn3" runat="server" Text="3" CssClass="btn" OnClientClick="appendNumber('3'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnSubtract" runat="server" Text="−" CssClass="btn operator" OnClientClick="appendOperator('-'); return false;" UseSubmitBehavior="false" />

                <!-- Row 5 -->
                <asp:Button ID="btn0" runat="server" Text="0" CssClass="btn" OnClientClick="appendNumber('0'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnDot" runat="server" Text="." CssClass="btn" OnClientClick="appendNumber('.'); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnEquals" runat="server" Text="=" CssClass="btn equals" OnClientClick="calculate(); return false;" UseSubmitBehavior="false" />
                <asp:Button ID="btnAdd" runat="server" Text="+" CssClass="btn operator" OnClientClick="appendOperator('+'); return false;" UseSubmitBehavior="false" />
            </div>
        </div>

        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <script type="text/javascript">
            var currentInput = '';
            var shouldResetDisplay = false;

            function appendNumber(num) {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                if (num === '.' && currentInput.includes('.')) return;
                if (currentInput === '0' && num !== '.') {
                    currentInput = num;
                } else {
                    currentInput += num;
                }
                updateDisplay(currentInput || '0');
            }

            function appendOperator(op) {
                if (currentInput === '' && document.getElementById('<%= txtDisplay.ClientID %>').value !== '0') {
                    currentInput = document.getElementById('<%= txtDisplay.ClientID %>').value;
                }
                if (currentInput !== '') {
                    // Evaluate existing expression if it ends with a number
                    if (/[0-9.]$/.test(currentInput)) {
                        try {
                            currentInput = eval(currentInput).toString();
                        } catch (e) {
                            currentInput = '0';
                        }
                    }
                    currentInput += op;
                    updateDisplay(currentInput);
                    shouldResetDisplay = false;
                }
            }

            function calculate() {
                if (currentInput === '') {
                    currentInput = document.getElementById('<%= txtDisplay.ClientID %>').value;
                }
                try {
                    var result = eval(currentInput);
                    if (result === Infinity || isNaN(result)) {
                        updateDisplay('Error');
                        currentInput = '';
                    } else {
                        currentInput = result.toString();
                        updateDisplay(currentInput);
                    }
                } catch (e) {
                    updateDisplay('Error');
                    currentInput = '';
                }
                shouldResetDisplay = true;
            }

            function clearDisplay() {
                currentInput = '';
                updateDisplay('0');
                shouldResetDisplay = false;
            }

            function backspace() {
                if (shouldResetDisplay) {
                    currentInput = document.getElementById('<%= txtDisplay.ClientID %>').value;
                    shouldResetDisplay = false;
                }
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput || '0');
            }

            function updateDisplay(value) {
                document.getElementById('<%= txtDisplay.ClientID %>').value = value;
            }
        </script>
    </form>
</body>
</html>