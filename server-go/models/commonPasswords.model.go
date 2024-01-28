package models

import (
	"gorm.io/gorm"
)

type CommonPasswords struct {
	gorm.Model
	Password string `json:"password"`
}

func (cp *CommonPasswords) CreateMost100CommonPasswords(db *gorm.DB) {
	// Check if the table is empty
	var count int64
	db.Model(&CommonPasswords{}).Count(&count)

	// If the table is empty, perform migration
	if count == 0 {
		var CommonPasswordsList = []string{
			"password",
			"123456",
			"123456789",
			"guest",
			"qwerty",
			"12345678",
			"111111",
			"12345",
			"col123456",
			"123123",
			"1234567",
			"1234",
			"1234567890",
			"000000",
			"555555",
			"666666",
			"123321",
			"654321",
			"7777777",
			"123",
			"D1lakiss",
			"777777",
			"110110jp",
			"1111",
			"987654321",
			"121212",
			"Gizli",
			"abc123",
			"112233",
			"azerty",
			"159753",
			"1q2w3e4r",
			"54321",
			"pass@123",
			"222222",
			"qwertyuiop",
			"qwerty123",
			"qazwsx",
			"vip",
			"asdasd",
			"123qwe",
			"123654",
			"iloveyou",
			"a1b2c3",
			"999999",
			"Groupd2013",
			"1q2w3e",
			"usr",
			"Liman1000",
			"1111111",
			"333333",
			"123123123",
			"9136668099",
			"11111111",
			"1qaz2wsx",
			"password1",
			"mar20lt",
			"987654321",
			"gfhjkm",
			"159357",
			"abcd1234",
			"131313",
			"789456",
			"luzit2000",
			"aaaaaa",
			"zxcvbnm",
			"asdfghjkl",
			"1234qwer",
			"88888888",
			"dragon",
			"987654",
			"888888",
			"qwe123",
			"football",
			"3601",
			"asdfgh",
			"master",
			"samsung",
			"12345678910",
			"killer",
			"1237895",
			"1234561",
			"12344321",
			"daniel",
			"000000",
			"444444",
			"101010",
			"qazwsxedc",
			"789456123",
			"super123",
			"qwer1234",
			"123456789a",
			"823477aA",
			"147258369",
			"unknown",
			"98765",
			"q1w2e3r4",
			"232323",
			"102030",
			"12341234",
		}

		for _, password := range CommonPasswordsList {
			commonPassword := new(CommonPasswords)
			commonPassword.Password = password
			db.Create(commonPassword)
		}
	}
	//
}
