// index.js

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const gradebookAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const gradebookABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_grade",
				"type": "uint256"
			}
		],
		"name": "addGrade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_newGrade",
				"type": "uint256"
			}
		],
		"name": "updateGrade",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			}
		],
		"name": "averageGrade",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			}
		],
		"name": "getGrade",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "grades",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "subject",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "grade",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const gradebookContract = new ethers.Contract(gradebookAddress, gradebookABI, signer);

const connectBtn = document.getElementById("connect");
const addStudentBtn = document.getElementById("addStudent");
const addGradeBtn = document.getElementById("addGrade");
const getGradesBtn = document.getElementById("getGrades");
const updateGradeBtn = document.getElementById("updateGrade");
const averageGradeBtn = document.getElementById("averageGrade");
const output = document.getElementById("output");

connectBtn.addEventListener("click", async () => {
  try {
    await provider.send("eth_requestAccounts", []);
    connectBtn.disabled = true;
    addStudentBtn.disabled = false;
  } catch (error) {
    console.error(error);
  }
});

addStudentBtn.addEventListener("click", async () => {
  try {
    const studentName = prompt("Enter student name:");
    await gradebookContract.addStudent(studentName);
    output.innerHTML = `Added student: ${studentName}`;
  } catch (error) {
    console.error(error);
  }
});

addGradeBtn.addEventListener("click", async () => {
  try {
    const studentName = prompt("Enter student name:");
    const grade = parseFloat(prompt("Enter grade:"));
    await gradebookContract.addGrade(studentName, grade);
    output.innerHTML = `Added grade for student: ${studentName}`;
  } catch (error) {
    console.error(error);
  }
});

getGradesBtn.addEventListener("click", async () => {
  try {
    const studentName = prompt("Enter student name:");
    const grades = await gradebookContract.getStudentGrades(studentName);
    output.innerHTML = `Grades for student ${studentName}: ${grades.join(", ")}`;
  } catch (error) {
    console.error(error);
  }
});

updateGradeBtn.addEventListener("click", async () => {
  try {
    const studentName = prompt("Enter student name:");
    const gradeIndex = parseInt(prompt("Enter grade index:"));
    const newGrade = parseFloat(prompt("Enter new grade:"));
    await gradebookContract.updateGrade(studentName, gradeIndex, newGrade);
    output.innerHTML = `Updated grade for student: ${studentName}`;
  } catch (error) {
    console.error(error);
  }
});

averageGradeBtn.addEventListener("click", async () => {
  try {
    const average = await gradebookContract.averageGrade();
    output.innerHTML = `Average grade: ${average}`;
  } catch (error) {
    console.error(error);
  }
});