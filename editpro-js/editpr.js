document.addEventListener("DOMContentLoaded", () => {
  const dictionary = {
    "Edit product": "تعديل المنتج",
    Products: "المنتجات",
    "Search products, SKUs...": "البحث عن المنتجات، الرموز...",
    Name: "الاسم",
    Category: "الفئة",
    "Purchase price (EGP)": "سعر الشراء (جنية)",
    "Sell price (EGP)": "سعر البيع (جنية)",
    SKU: "رمز التخزين (SKU)",
    Cancel: "إلغاء",
    "Save changes": "حفظ التغييرات",
    Dashboard: "لوحة التحكم",
    Alerts: "التنبيهات",
    Inventory: "المخزون",
    "AI forecast": "التنبؤ الذكي",
    "Purchase orders": "أوامر الشراء",
    Suppliers: "الموردين",
    Reports: "التقارير",
    "Active users": "المستخدمون النشطون",
    "Signed in to the website": "مسجل الدخول إلى الموقع",
    Employee: "موظف",
    Merchant: "تاجر",
    Admin: "مدير النظام",
    Manager: "مدير",
    "Warehouse Manager": "مدير المخزون",
"Manager": "مدير",
"WM": "وم",
    "5 online": "٥ متصلون",
    "Active 8 min ago": "نشط منذ 8 دقائق",
  };

  const reverseDictionary = Object.fromEntries(
    Object.entries(dictionary).map(([key, value]) => [value, key]),
  );
  let currentLang = "en";

  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      langButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const btnText = btn.textContent.trim();
      if (btnText === "العربية" && currentLang !== "ar") {
        currentLang = "ar";
      } else if (btnText === "English" && currentLang !== "en") {
        currentLang = "en";
      } else {
        return;
      }

      document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = currentLang;
const teamCount = document.getElementById("teamCount");
if (teamCount) {
  teamCount.textContent = currentLang === "ar" ? "٥" : "5";
}
      const inputs = document.querySelectorAll(".form-group input");
      inputs.forEach((input) => {
        const ph = input.getAttribute(`data-placeholder-${currentLang}`);
        if (ph) {
          input.setAttribute("placeholder", ph);
        }
      });

      function translateNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.nodeValue.trim();
          if (!text) return;

          if (currentLang === "ar" && dictionary[text]) {
            node.nodeValue = node.nodeValue.replace(text, dictionary[text]);
          } else if (currentLang === "en" && reverseDictionary[text]) {
            node.nodeValue = node.nodeValue.replace(
              text,
              reverseDictionary[text],
            );
          }
        } else {
          if (node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
            node.childNodes.forEach((child) => translateNode(child));
          }
        }
      }

      document.body.childNodes.forEach((child) => translateNode(child));
    });
  });

  // Team Popup Toggle & Account Switching logic
  const teamBtn = document.querySelector(".team");
  const usersPopup = document.getElementById("usersPopup");

  if (teamBtn && usersPopup) {
    teamBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      usersPopup.style.display =
        usersPopup.style.display === "flex" ? "none" : "flex";
    });

    document.addEventListener("click", (e) => {
      if (!usersPopup.contains(e.target) && !teamBtn.contains(e.target)) {
        usersPopup.style.display = "none";
      }
    });
  }

  const userItems = document.querySelectorAll(".popup-user-item");
  userItems.forEach((item) => {
    item.addEventListener("click", () => {
      const userName = item.getAttribute("data-name");
      const userRole = item.getAttribute("data-role");
      const userInitials = item.getAttribute("data-initials");

      const sidebarName = document.getElementById("sidebarManagerName");
      const sidebarRole = document.getElementById("sidebarManagerRole");
      const popupName = document.getElementById("currentManagerName");
      const popupRole = document.getElementById("currentManagerRole");

      if (sidebarName) sidebarName.textContent = userName;

      if (popupName) popupName.textContent = userName;

      const displayedRole =
        currentLang === "ar" ? dictionary[userRole] || userRole : userRole;

      if (sidebarRole) sidebarRole.textContent = displayedRole;
      if (popupRole) popupRole.textContent = displayedRole;
      const profileAvatar = document.querySelector(".profile .avatar");
      if (profileAvatar) profileAvatar.textContent = userInitials;

      usersPopup.style.display = "none";

      const msg =
        currentLang === "ar"
          ? `تم التبديل بنجاح إلى حساب: ${userName}`
          : `Successfully switched to account: ${userName}`;
      alert(msg);
    });
  });

  const logoutBtn = document.querySelector(".popup-action-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const msg =
        currentLang === "ar"
          ? "جاري تسجيل الخروج..."
          : "Logging out current session...";
      alert(msg);
    });
  }


  const saveBtn = document.querySelector(".btn-save");
  const cancelBtn = document.querySelector(".btn-cancel");

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const msg =
        currentLang === "ar"
          ? "تم حفظ التغييرات بنجاح!"
          : "Product changes saved successfully!";
      alert(msg);
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      const msg =
        currentLang === "ar" ? "تم إلغاء التغييرات." : "Changes discarded.";
      alert(msg);
    });
  }

  const bellBtn = document.querySelector(".bell");

  if (bellBtn) {
    bellBtn.addEventListener("click", () => {
      alert(
        currentLang === "ar"
          ? "لا توجد إشعارات جديدة حالياً."
          : "No new notifications right now.",
      );
    });
  }
});
