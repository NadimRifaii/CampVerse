package models

type Week struct {
	ID         uint `gorm:"primarykey"`
	BootcampId uint `gorm:"foreignkey:BootcampId"`
	Result     []*Result
}
type Grade struct {
	ID       uint `gorm:"primarykey"`
	StackId  uint `gorm:"foreignkey:StackId"`
	Stack    Stack
	ResultId uint `gorm:"foreignkey:ResultId"`
	Score    int  `json:"score"`
}
type Result struct {
	ID     uint `gorm:"primarykey"`
	UserId uint `gorm:"foreignkey:UserId"`
	User   User
	WeekId uint     `gorm:"foreignkey:WeekId" json:"weekId"`
	Grade  []*Grade `json:"grades"`
}
