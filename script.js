// تعريف مصفوفة لتخزين بيانات النتائج
let resultsData = [];

// تحميل البيانات من ملف JSON
fetch("results.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("فشل تحميل ملف البيانات");
    }
    return response.json();
  })
  .then(data => {
    resultsData = data; // تخزين البيانات في المتغير
    console.log("تم تحميل البيانات:", resultsData);
  })
  .catch(error => console.error("خطأ في تحميل البيانات:", error));

// دالة عرض النتائج باستخدام تصميم البطاقة
function displayResults(results) {
  const container = document.getElementById('resultsContainer');
  container.innerHTML = ""; // مسح النتائج السابقة

  if (results.length === 0) {
    container.innerHTML = `<p class="no-results">❌ لم يتم العثور على نتائج.</p>`;
    return;
  }

  results.forEach(item => {
    if (!item.B) return;

    // إضافة رسالة خاصة إذا كان اسم المحفظ هو "مكتب الشيخ سعد أبو نوارج"
    let specialMsg = "";
    if (item.E && item.E.trim() === "مكتب الشيخ سعد أبونوارج") {
      specialMsg = `<p class="special-msg">📢 تيزك وعليا النعمة المفروض تجيب 40 😆</p>`;
    }

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="card-header">
         <h3 class="card-name">${item.C}</h3>
         <p class="card-exam">المستوى: ${item.D}</p>
      </div>
      <div class="card-body">
         <p><strong>الرقم القومي:</strong> ${item.B}</p>
         <p><strong>اسم المحفظ:</strong> ${item.E}</p>
         ${specialMsg}
         <p><strong>آخر مستوى تم التكريم فيه:</strong> ${item.F}</p>
         <p><strong>السنّ:</strong> ${item.G}</p>
         <p><strong>رقم الهاتف:</strong> ${item.H}</p>
         <p><strong>الدرجة:</strong> <span class="card-score">${item.I}</span></p>
      </div>
    `;
    container.appendChild(card);
  });
}

// وظيفة البحث باستخدام الرقم القومي عند النقر على زر "بحث"
document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('searchNational').value.trim();
  console.log("الرقم المدخل:", query);

  if (query === "") {
    displayResults([]);
    return;
  }

  // تصفية النتائج بناءً على تطابق المفتاح "B" مع قيمة البحث
  const filteredResults = resultsData.filter(item =>
    item.B && item.B.toString() === query
  );

  displayResults(filteredResults);
});
results.forEach(item => {
    if (!item.B) return;

    // تحقق من الدرجة وإذا كانت 60 فأكثر يتم إضافة ختم التميز
    let honorHTML = "";
    if (Number(item.I) >= 60) {
      honorHTML = `
        <div class="honor-stamp">
          <p style="font-size: 24px; font-weight: bold; color: #0056b3;">مكرم</p>
          <p style="font-size: 20px; color: #d9534f;">تهانينا ابننا الغالي 🌹</p>
        </div>
      `;
    }

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="card-header">
         <h3 class="card-name">${item.C}</h3>
         <p class="card-exam">المستوى: ${item.D}</p>
      </div>
      <div class="card-body">
         <p><strong>الرقم القومي:</strong> ${item.B}</p>
         <p><strong>اسم المحفظ:</strong> ${item.E}</p>
         <p><strong>آخر مستوى تم التكريم فيه:</strong> ${item.F}</p>
         <p><strong>السنّ:</strong> ${item.G}</p>
         <p><strong>رقم الهاتف:</strong> ${item.H}</p>
         <p><strong>الدرجة:</strong> <span class="card-score">${item.I}</span></p>
         ${honorHTML}
      </div>
    `;
    container.appendChild(card);
});
