UPDATE restaurants SET name = 'Rahul_Restro' WHERE id = 'demo-restaurant';
UPDATE users SET 
  email = 'rp524917@gmail.com',
  name = 'Rahul',
  "passwordHash" = '$2b$12$qmC1mEALOcbgtO0G7DASZuVk4NKs9161ykiQVo7S8NTbmflG0xAC2',
  "pinHash" = '$2b$12$zV3Fh61bzZdrJMLuuDAJ4.o0uMoyU96YD6siYqSRS17OBaEFKJPNe'
WHERE email = 'owner@demo.local';
