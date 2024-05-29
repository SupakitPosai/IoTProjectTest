## IoT Assignment

### การพัฒนาแพลตฟอร์ม IoT สำหรับการจัดการอุปกรณ์สำนักงานหลังบ้าน

ระบบนี้ควรพัฒนาเป็นเว็บแอปพลิเคชัน

### การแบ่งส่วนของระบบ

ระบบควรแบ่งออกเป็น 2 ส่วน: Frontend และ Backend

#### Frontend

* **เทคโนโลยี:** Frontend ควรพัฒนาโดยใช้ ReactJs หรือ NextJs เขียนด้วย Typescript หรือ Javascript
* **ความต้องการ:**
    * หน้าลงทะเบียนสำหรับสมัครสมาชิก ประกอบด้วยฟิลด์ข้อมูลดังนี้
        * ชื่อผู้ใช้
        * อีเมล
        * รหัสผ่าน (ต้องเข้ารหัส ห้ามใช้ plain-text)
    * หน้าเข้าสู่ระบบสำหรับผู้ใช้ในการล็อกอินด้วยชื่อผู้ใช้และรหัสผ่าน และได้รับ JWT Token (มีอายุใช้งาน 1 ชั่วโมง) จาก Backend
    * หน้าสำหรับดูรายการอุปกรณ์ทั้งหมดในระบบ ต้องใช้ JWT Token สำหรับการเรียกใช้ API ทุกครั้ง
    * ฟังก์ชันการทำงานสำหรับผู้ใช้ในการเพิ่ม แก้ไข และลบอุปกรณ์ผ่านทางเว็บแอปพลิเคชัน

#### Backend

* **Technology:** Backend ควรพัฒนาโดยใช้ NodeJs เขียนด้วย Typescript หรือ Javascript
* **API:** Frontend และ Backend จะสื่อสารกันผ่าน RESTful API
* **Database:** เชื่อมต่อกับฐานข้อมูลแบบ Relational หรือ Non-relational

### การนำไปใช้งาน

* สามารถนำแอปพลิเคชันไปใช้งานได้โดยใช้ container โดยใช้คำสั่งเดียวในการ run application

### เอกสารประกอบ

* ควรใช้ Git สำหรับการควบคุมเวอร์ชัน

## การส่งงาน

* ส่งงานไปที่อีเมล chanon.wsr2@hotmail.com (Ton) พร้อมด้วย URL ของ git (GitHub หรือ GitLab) เพื่อการตรวจสอบ
* รวมคู่มือผู้ใช้และคำแนะนำเบื้องต้นในการติดตั้ง โดยเฉพาะอย่างยิ่งหากเว็บแอปพลิเคชันไม่สามารถรันได้ด้วยคำสั่งเดียว
* กำหนดระยะเวลาพัฒนาจนถึงวันพุธที่ 29 พฤษภาคม 2567 เวลา 23:59 น.
---
# “Have fun developing and see you soon ;)”