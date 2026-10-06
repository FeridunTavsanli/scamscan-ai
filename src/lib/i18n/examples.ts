import type { Lang } from "./dict";

// [bank, delivery, phishing, investment]
export const EXAMPLES: Record<Lang, [string, string, string, string]> = {
  en: [
    "SECURITY ALERT: Your bank account has been temporarily suspended due to unusual activity. Verify your identity within 30 minutes to avoid permanent closure: http://secure-bank-verify.co/login",
    "Your parcel could not be delivered due to an unpaid customs fee of $1.99. Pay now to reschedule delivery: https://bit.ly/pkg-redeliver",
    "Dear user, we detected a sign-in from a new device. If this wasn't you, confirm your password and the 6-digit code we sent you here: http://micros0ft-account-help.com",
    "Hi! I'm a crypto trading mentor. My students earn 300% weekly with zero risk. Invest just $250 today and I'll double it in 48 hours. Message me on WhatsApp to start!",
  ],
  tr: [
    "GÜVENLİK UYARISI: Hesabınız olağandışı işlem nedeniyle geçici olarak askıya alındı. Kalıcı kapanmayı önlemek için 30 dakika içinde kimliğinizi doğrulayın: http://banka-guvenli-dogrula.com/giris",
    "Kargonuz 12,90 TL ödenmemiş gümrük ücreti nedeniyle teslim edilemedi. Teslimatı yeniden planlamak için hemen ödeyin: https://bit.ly/kargo-odeme",
    "Sayın kullanıcı, hesabınıza yeni bir cihazdan giriş yapıldı. Siz değilseniz şifrenizi ve size gönderilen 6 haneli kodu buradan onaylayın: http://e-devlet-destek-giris.com",
    "Merhaba! Ben bir kripto yatırım danışmanıyım. Öğrencilerim risksiz haftada %300 kazanıyor. Bugün sadece 5.000 TL yatırın, 48 saatte ikiye katlayayım. Başlamak için WhatsApp'tan yazın!",
  ],
  de: [
    "SICHERHEITSWARNUNG: Ihr Bankkonto wurde wegen ungewöhnlicher Aktivitäten vorübergehend gesperrt. Bestätigen Sie Ihre Identität innerhalb von 30 Minuten: http://sicher-bank-verifizierung.de-login.com",
    "Ihr Paket konnte wegen einer unbezahlten Zollgebühr von 1,99 € nicht zugestellt werden. Jetzt bezahlen: https://bit.ly/paket-zustellung",
    "Sehr geehrter Nutzer, wir haben eine Anmeldung von einem neuen Gerät festgestellt. Falls Sie das nicht waren, bestätigen Sie Ihr Passwort und den 6-stelligen Code hier: http://paypa1-hilfe.com",
    "Hallo! Ich bin Krypto-Mentor. Meine Schüler verdienen 300 % pro Woche ohne Risiko. Investieren Sie heute nur 250 € und ich verdopple es in 48 Stunden. Schreiben Sie mir auf WhatsApp!",
  ],
  fr: [
    "ALERTE SÉCURITÉ : Votre compte bancaire a été temporairement suspendu suite à une activité inhabituelle. Vérifiez votre identité sous 30 minutes : http://banque-securite-verif.com/connexion",
    "Votre colis n'a pas pu être livré en raison de frais de douane impayés de 1,99 €. Payez maintenant : https://bit.ly/colis-livraison",
    "Cher utilisateur, une connexion depuis un nouvel appareil a été détectée. Si ce n'était pas vous, confirmez votre mot de passe et le code à 6 chiffres ici : http://ameli-remboursement-aide.com",
    "Bonjour ! Je suis mentor en trading crypto. Mes élèves gagnent 300 % par semaine sans risque. Investissez seulement 250 € aujourd'hui, je le double en 48 h. Écrivez-moi sur WhatsApp !",
  ],
  es: [
    "ALERTA DE SEGURIDAD: Tu cuenta bancaria ha sido suspendida temporalmente por actividad inusual. Verifica tu identidad en 30 minutos: http://banco-seguro-verificar.com/acceso",
    "Tu paquete no pudo entregarse por una tasa de aduana impaga de 1,99 €. Paga ahora para reprogramar: https://bit.ly/paquete-entrega",
    "Estimado usuario, detectamos un inicio de sesión desde un nuevo dispositivo. Si no fuiste tú, confirma tu contraseña y el código de 6 dígitos aquí: http://netfIix-cuenta-ayuda.com",
    "¡Hola! Soy mentor de trading cripto. Mis alumnos ganan un 300 % semanal sin riesgo. Invierte solo 250 € hoy y lo duplico en 48 horas. ¡Escríbeme por WhatsApp!",
  ],
  it: [
    "AVVISO DI SICUREZZA: Il tuo conto è stato sospeso temporaneamente per attività insolite. Verifica la tua identità entro 30 minuti: http://banca-sicura-verifica.com/accesso",
    "Il tuo pacco non è stato consegnato per una tassa doganale non pagata di 1,99 €. Paga ora: https://bit.ly/pacco-consegna",
    "Gentile utente, abbiamo rilevato un accesso da un nuovo dispositivo. Se non sei stato tu, conferma password e codice a 6 cifre qui: http://poste-assistenza-login.com",
    "Ciao! Sono un mentore di trading crypto. I miei studenti guadagnano il 300% a settimana senza rischi. Investi solo 250 € oggi e li raddoppio in 48 ore. Scrivimi su WhatsApp!",
  ],
  pt: [
    "ALERTA DE SEGURANÇA: A sua conta bancária foi suspensa temporariamente por atividade invulgar. Verifique a sua identidade em 30 minutos: http://banco-seguro-verificar.com/entrar",
    "A sua encomenda não foi entregue devido a uma taxa alfandegária de 1,99 € por pagar. Pague agora: https://bit.ly/encomenda-ctt",
    "Caro utilizador, detetámos um início de sessão num novo dispositivo. Se não foi você, confirme a palavra-passe e o código de 6 dígitos aqui: http://financas-portal-ajuda.com",
    "Olá! Sou mentor de trading de cripto. Os meus alunos ganham 300% por semana sem risco. Invista só 250 € hoje e duplico em 48 horas. Fale comigo no WhatsApp!",
  ],
  nl: [
    "BEVEILIGINGSWAARSCHUWING: Uw bankrekening is tijdelijk geblokkeerd wegens ongebruikelijke activiteit. Bevestig binnen 30 minuten uw identiteit: http://bank-veilig-verifieren.com/inloggen",
    "Uw pakket kon niet worden bezorgd vanwege onbetaalde invoerkosten van € 1,99. Betaal nu: https://bit.ly/pakket-bezorging",
    "Beste gebruiker, er is ingelogd vanaf een nieuw apparaat. Was u dit niet? Bevestig uw wachtwoord en de 6-cijferige code hier: http://digid-hulp-inloggen.com",
    "Hoi! Ik ben cryptomentor. Mijn leerlingen verdienen 300% per week zonder risico. Investeer vandaag slechts € 250 en ik verdubbel het in 48 uur. Stuur me een WhatsApp!",
  ],
  ru: [
    "ВНИМАНИЕ: Ваш банковский счёт временно заблокирован из-за подозрительной активности. Подтвердите личность в течение 30 минут: http://bank-bezopasnost-proverka.com/vhod",
    "Ваша посылка не доставлена из-за неоплаченной таможенной пошлины 149 ₽. Оплатите сейчас: https://bit.ly/posylka-dostavka",
    "Уважаемый пользователь, обнаружен вход с нового устройства. Если это были не вы, подтвердите пароль и 6-значный код здесь: http://gosuslugi-pomosh-vhod.com",
    "Привет! Я наставник по крипто-трейдингу. Мои ученики зарабатывают 300% в неделю без риска. Вложите всего 20 000 ₽ сегодня — удвою за 48 часов. Пишите в WhatsApp!",
  ],
  ar: [
    "تنبيه أمني: تم تعليق حسابك البنكي مؤقتًا بسبب نشاط غير معتاد. تحقق من هويتك خلال 30 دقيقة لتجنب الإغلاق النهائي: http://bank-secure-verify.co/login",
    "تعذر توصيل طردك بسبب رسوم جمركية غير مدفوعة بقيمة 7 ريال. ادفع الآن لإعادة الجدولة: https://bit.ly/parcel-pay",
    "عزيزي المستخدم، رصدنا تسجيل دخول من جهاز جديد. إذا لم تكن أنت، أكد كلمة المرور والرمز المكون من 6 أرقام هنا: http://absher-help-login.com",
    "مرحبًا! أنا مدرب تداول عملات رقمية. طلابي يربحون 300% أسبوعيًا بلا مخاطرة. استثمر 1000 ريال فقط اليوم وسأضاعفها خلال 48 ساعة. راسلني على واتساب!",
  ],
  zh: [
    "安全警报：您的银行账户因异常活动已被临时冻结。请在30分钟内验证身份以免永久关闭：http://bank-secure-verify.cn-login.com",
    "您的包裹因未支付1.99元关税无法派送。请立即支付以重新安排派送：https://bit.ly/pkg-pay",
    "尊敬的用户，我们检测到新设备登录。如非本人操作，请在此确认密码和6位验证码：http://a1ipay-help-center.com",
    "你好！我是加密货币交易导师。我的学员每周零风险赚300%。今天只需投资2000元，48小时内翻倍。加我微信开始吧！",
  ],
  ja: [
    "【重要】お客様の銀行口座は不審な取引のため一時停止されました。30分以内に本人確認を行わないと永久に凍結されます：http://bank-anzen-kakunin.com/login",
    "関税 200 円が未払いのため、お荷物をお届けできませんでした。今すぐお支払いください：https://bit.ly/nimotsu-pay",
    "お客様へ：新しい端末からのログインを検出しました。心当たりがない場合は、こちらでパスワードと6桁のコードを確認してください：http://amaz0n-account-help.com",
    "こんにちは！仮想通貨トレードの講師です。生徒は毎週ノーリスクで300%稼いでいます。今日3万円投資すれば48時間で2倍にします。LINEで連絡ください！",
  ],
  ko: [
    "[보안 경고] 비정상적인 활동으로 고객님의 은행 계좌가 일시 정지되었습니다. 30분 이내에 본인 인증을 완료하세요: http://bank-safe-verify.com/login",
    "미납 관세 2,500원으로 택배를 배송하지 못했습니다. 지금 결제하여 재배송을 예약하세요: https://bit.ly/taekbae-pay",
    "고객님, 새 기기에서 로그인이 감지되었습니다. 본인이 아니라면 여기서 비밀번호와 6자리 인증번호를 확인하세요: http://naver-security-help.com",
    "안녕하세요! 저는 코인 투자 멘토입니다. 제 수강생들은 무위험으로 주당 300%를 벌어요. 오늘 30만원만 투자하면 48시간 안에 두 배로 만들어 드립니다. 카톡 주세요!",
  ],
  hi: [
    "सुरक्षा चेतावनी: असामान्य गतिविधि के कारण आपका बैंक खाता अस्थायी रूप से निलंबित कर दिया गया है। स्थायी बंद होने से बचने के लिए 30 मिनट में KYC सत्यापित करें: http://sbi-kyc-update.co/login",
    "₹25 के बकाया सीमा शुल्क के कारण आपका पार्सल डिलीवर नहीं हो सका। दोबारा डिलीवरी के लिए अभी भुगतान करें: https://bit.ly/parcel-pay",
    "प्रिय उपयोगकर्ता, नए डिवाइस से लॉगिन पाया गया। यदि यह आप नहीं थे, तो यहाँ अपना पासवर्ड और 6 अंकों का OTP पुष्टि करें: http://paytm-help-support.com",
    "नमस्ते! मैं क्रिप्टो ट्रेडिंग मेंटर हूँ। मेरे छात्र बिना जोखिम हर हफ्ते 300% कमाते हैं। आज सिर्फ ₹5000 लगाएँ, 48 घंटे में दोगुना करूँगा। WhatsApp पर मैसेज करें!",
  ],
};
