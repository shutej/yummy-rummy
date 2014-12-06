package main

import (
	"fmt"
	"log"

	"github.com/facebookgo/freeport"
	"github.com/gin-gonic/gin"
	open "github.com/skratchdot/open-golang/open"
)

func OpenInBrowser(engine *gin.Engine) {
	port, err := freeport.Get()
	if err != nil {
		log.Fatal("error finding free port: ", err)
	}
	open.Start(fmt.Sprintf("http://127.0.0.1:%d", port))
	engine.Run(fmt.Sprintf(":%d", port))
}

func main() {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.String(200, "hello world")
	})
	OpenInBrowser(router)
}
