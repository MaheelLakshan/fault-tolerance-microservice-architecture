# 🛒 Kafka Microservices – Fault Tolerant E-commerce Checkout Flow

A fully event-driven, fault-tolerant microservices system using **Apache Kafka (KRaft mode)**. This simulates a real-world e-commerce checkout process involving payment, order creation, email notification, and analytics tracking — all handled through Kafka topics.

---

## 📸 Demo & Architecture Overview

> 🔻 Upload your architecture diagrams or UI screenshots here

![e commerce dashboard](https://github.com/user-attachments/assets/f921cba4-9937-4e49-91b6-b7608bfab5e4)
![Flow Diagram](https://github.com/user-attachments/assets/6237ff9c-dd21-4b31-a86a-58d1dcaab564)
![Results Log](https://github.com/user-attachments/assets/ef2c83c0-e34e-4a12-8518-b5ce40407877)
![Brokers with replicas](https://github.com/user-attachments/assets/47bce1a7-ff0f-4d7f-9a66-0251a3b63b55)
![Screenshot (14)](https://github.com/user-attachments/assets/31cb2138-6195-4c8a-9892-49e0ac1c0027)

---

## 🚀 Project Summary

I recently built a **fault-tolerant microservices system** using **Apache Kafka in KRaft mode**, simulating a complete e-commerce checkout flow. The system is composed of decoupled services communicating via Kafka topics with proper partitioning, replication, and failover support.

💡 It uses:
- **3 Kafka brokers**
- **3 partitions**
- **3 replicas**
- Kafka **KRaft mode** (no ZooKeeper)

### 🔁 Event Flow:
1. **Payment Service** → User clicks checkout → Publishes `payment-successful`
2. **Order Service** → Subscribes to `payment-successful` → Publishes `order-successful`
3. **Email Service** → Subscribes to `order-successful` → Publishes `email-successful`
4. **Analytics Service** → Subscribes to all topics for real-time logging

---

## ⚙️ Kafka Fault Tolerance with KRaft

- All 3 brokers are configured as both **brokers** and **controllers**
- **Raft-based leader election** ensures metadata availability even if one broker fails
- **3 replicas per partition** guarantee data durability
- If a **controller** or **broker** goes down, a new leader is elected automatically
- Follows standard practice with an **odd number of brokers (3)** for quorum reliability

---

## 🧰 Tech Stack

| Layer        | Technology                 |
|--------------|----------------------------|
| Messaging    | Apache Kafka (KRaft mode)  |
| Services     | Node.js, KafkaJS           |
| Frontend     | Next.js                    |
| UI Monitor   | Kafka UI (Provectus)       |
| Messaging    | JSON over Kafka topics     |
| Dev Environment | Docker Compose           |

---

