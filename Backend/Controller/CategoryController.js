const prisma = require('../config/db.js')
const { faker } = require('@faker-js/faker');


exports.generateCategory = async function (req, res) {
    try {
        for (let i = 0; i < 100; i++) {
            await prisma.category.create({
                data: {
                    categoryName: faker.commerce.product()
                }
            })
        }
        res.status(200).send("Category Generation Completed...")

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.showCategory = async function (req, res) {
    try {
        let page = Number(req.query.page);
        let userId = Number(req.user.id);
        if(!page || !Number.isInteger(page)){
            return res.status(404).json({ message: "Page Not Found" })
        }
        const limit = 6;
        if (page < 1) {
            page = 1
        }
        if (page > 17) {
            page = 17
        }
        const skip = (page - 1) * 6
        const category = await prisma.category.findMany({
            skip,
            take: limit
        })  // category return some row as output

        // Sort Array
        // find the interests array from userInterest
        const userInterestRow = await prisma.userInterest.findUnique({
            where: { userId },
        });
        // sorting
        if (userInterestRow) {
            const sortedInterests = userInterestRow.interests.sort((a, b) => a - b);
            await prisma.userInterest.update({
                where: { userId },
                data: { interests: sortedInterests },
            });
        }
        // return interests for this user
        const interestsArray = userInterestRow.interests
        res.status(200).json({ page, category, interestsArray, message: "Data Fetched from Backend & is sorting in back" })     

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.editAddCategory = async function (req, res) {
    try {
        let categoryId = Number(req.query.categoryId);
        let userId = Number(req.user.id);
        // check valid categoryId 
        if (!categoryId || !Number.isInteger(categoryId) || categoryId > 100 || categoryId < 1) {
            return res.status(404).json({ message: "Invalid Category Id" })
        }
        
        // create and add
        let userInterestRow = await prisma.userInterest.findUnique({
            where: { userId },
        })

        if (userInterestRow) {
            await prisma.userInterest.update({
                where: { userId },
                data: {
                    interests: {
                        push: categoryId
                    }
                }
            });
            res.status(200).json({message: "interest updated..."})
        }
        else {
            await prisma.userInterest.create({
                data: {
                    userId,
                    interests: [categoryId],
                },
            });
            res.status(200).json({message: "interest created..."})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.editDeleteCategory = async function (req, res) {
    try {
        let categoryId = Number(req.query.categoryId);
        let userId = Number(req.user.id);
        // check valid categoryId
        if (!categoryId || !Number.isInteger(categoryId) || categoryId > 100 || categoryId < 1) {
            return res.status(404).json({ message: "Invalid Category Id" })
        }
        // check and delete
        const userInterestRow = await prisma.userInterest.findUnique({
            where: { userId },
        })

        if (userInterestRow) {
            const updatedInterests = userInterestRow.interests.filter(id => id !== categoryId);
            await prisma.userInterest.update({
                where: { userId },
                data: { interests: updatedInterests },
            });
            return res.status(200).json({ message: "interest removed..."})
        }
        else {
            return res.status(400).json({ message: "UserInterest record not found."})
        }
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

