package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/elazarl/go-bindata-assetfs"
	"github.com/facebookgo/freeport"
	"github.com/shutej/yummy/static"
	open "github.com/skratchdot/open-golang/open"
)

func OpenInBrowser() error {
	port, err := freeport.Get()
	if err != nil {
		return fmt.Errorf("error finding free port: %v", err)
	}

	open.Start(fmt.Sprintf("http://127.0.0.1:%d", port))
	return http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}

func main() {
	http.Handle("/",
		http.StripPrefix("/",
			http.FileServer(
				&assetfs.AssetFS{
					Asset:    static.Asset,
					AssetDir: static.AssetDir,
					Prefix:   "build/",
				})))
	log.Fatal(OpenInBrowser())
}
