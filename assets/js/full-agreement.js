document.addEventListener("DOMContentLoaded", function () {
    const agreeAll = document.getElementById("agreeAll");
    const requiredAgrees = [
        document.getElementById("agreeGuide"),
        document.getElementById("agreePrivacy"),
        document.getElementById("agreeThird")
    ];

    // 전체 동의 클릭 시
    agreeAll.addEventListener("change", function () {
        requiredAgrees.forEach(cb => {
            cb.checked = agreeAll.checked;
        });
    });

    // 개별 동의 변경 시
    requiredAgrees.forEach(cb => {
        cb.addEventListener("change", function () {
            agreeAll.checked = requiredAgrees.every(item => item.checked);
        });
    });
});