// Initialize Storage
if (!localStorage.getItem("patients")) localStorage.setItem("patients", JSON.stringify([]));
if (!localStorage.getItem("doctors")) localStorage.setItem("doctors", JSON.stringify([]));
if (!localStorage.getItem("beds")) localStorage.setItem("beds", JSON.stringify([]));

// ADD PATIENT
function addPatient() {
    let name = document.getElementById("pname").value;
    let department = document.getElementById("department").value;
    let cost = document.getElementById("cost").value;

    let patients = JSON.parse(localStorage.getItem("patients"));
    patients.push({ name, department, cost: Number(cost) });
    localStorage.setItem("patients", JSON.stringify(patients));

    alert("Patient Added Successfully");
    location.reload();
}

// ADD DOCTOR
function addDoctor() {
    let name = document.getElementById("dname").value;
    let specialty = document.getElementById("specialty").value;

    let doctors = JSON.parse(localStorage.getItem("doctors"));
    doctors.push({ name, specialty });
    localStorage.setItem("doctors", JSON.stringify(doctors));

    alert("Doctor Added Successfully");
    location.reload();
}

// ADD BED
function addBed() {
    let bedNumber = document.getElementById("bedNumber").value;
    let status = document.getElementById("bedStatus").value;

    let beds = JSON.parse(localStorage.getItem("beds"));
    beds.push({ bedNumber, status });
    localStorage.setItem("beds", JSON.stringify(beds));

    alert("Bed Added Successfully");
    location.reload();
}
// Initialize Treatments Storage
if (!localStorage.getItem("treatments")) {
    localStorage.setItem("treatments", JSON.stringify([]));
}

// ADD TREATMENT
function addTreatment() {
    let patientName = document.getElementById("tPatient").value;
    let doctorName = document.getElementById("tDoctor").value;
    let treatmentType = document.getElementById("tType").value;
    let days = document.getElementById("tDays").value;

    let baseCost = 0;

    // Cost classification (Processing Data)
    if (treatmentType === "Surgery") baseCost = 50000;
    if (treatmentType === "Consultation") baseCost = 5000;
    if (treatmentType === "Therapy") baseCost = 10000;

    let totalCost = baseCost * Number(days);

    let treatments = JSON.parse(localStorage.getItem("treatments"));
    treatments.push({
        patientName,
        doctorName,
        treatmentType,
        days,
        totalCost
    });

    localStorage.setItem("treatments", JSON.stringify(treatments));

    alert("Treatment Recorded. Total Cost: Ksh " + totalCost);
    location.reload();
}
let treatments = JSON.parse(localStorage.getItem("treatments")) || [];

let consultation = treatments.filter(t => t.treatmentType === "Consultation").length;
let surgery = treatments.filter(t => t.treatmentType === "Surgery").length;
let therapy = treatments.filter(t => t.treatmentType === "Therapy").length;

new Chart(document.getElementById("treatmentChart"), {
    type: "pie",
    data: {
        labels: ["Consultation", "Surgery", "Therapy"],
        datasets: [{
            data: [consultation, surgery, therapy]
        }]
    }
});