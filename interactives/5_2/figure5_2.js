(function () {
    var dataset = [
        { "region": "Midwest", "sector": "Agriculture", "start": 1973, "end": 1980, "gain": 417, "loss": 625.1428571428571, "net": -208.1428571428571 },
        { "region": "Midwest", "sector": "Agriculture", "start": 1980, "end": 1986, "gain": 450.8333333333333, "loss": 738.5, "net": -287.6666666666667 },
        { "region": "Midwest", "sector": "Agriculture", "start": 1986, "end": 1992, "gain": 348.3333333333333, "loss": 1235, "net": -886.6666666666667 },
        { "region": "Midwest", "sector": "Agriculture", "start": 1992, "end": 2000, "gain": 325.75, "loss": 1342.375, "net": -1016.625 },
        { "region": "Midwest", "sector": "Agriculture", "start": 2001, "end": 2006, "gain": 85.8, "loss": 572.8, "net": -486.99999999999994 },
        { "region": "Midwest", "sector": "Agriculture", "start": 2006, "end": 2011, "gain": 120.8, "loss": 315.2, "net": -194.39999999999998 },
        { "region": "Midwest", "sector": "Barren", "start": 1973, "end": 1980, "gain": 3.4285714285714284, "loss": 1.4285714285714286, "net": 1.9999999999999998 },
        { "region": "Midwest", "sector": "Barren", "start": 1980, "end": 1986, "gain": 1.8333333333333335, "loss": 5.166666666666666, "net": -3.3333333333333326 },
        { "region": "Midwest", "sector": "Barren", "start": 1986, "end": 1992, "gain": 2.3333333333333335, "loss": 2.1666666666666665, "net": 0.16666666666666696 },
        { "region": "Midwest", "sector": "Barren", "start": 1992, "end": 2000, "gain": 4.375, "loss": 1.5, "net": 2.875 },
        { "region": "Midwest", "sector": "Barren", "start": 2001, "end": 2006, "gain": 70, "loss": 27.799999999999997, "net": 42.2 },
        { "region": "Midwest", "sector": "Barren", "start": 2006, "end": 2011, "gain": 50, "loss": 30, "net": 20 },
        { "region": "Midwest", "sector": "Developed", "start": 1973, "end": 1980, "gain": 467.2857142857143, "loss": 3.7142857142857144, "net": 463.57142857142856 },
        { "region": "Midwest", "sector": "Developed", "start": 1980, "end": 1986, "gain": 399.83333333333337, "loss": 5.5, "net": 394.33333333333337 },
        { "region": "Midwest", "sector": "Developed", "start": 1986, "end": 1992, "gain": 589, "loss": 9.333333333333334, "net": 579.6666666666666 },
        { "region": "Midwest", "sector": "Developed", "start": 1992, "end": 2000, "gain": 884.25, "loss": 6.625, "net": 877.625 },
        { "region": "Midwest", "sector": "Developed", "start": 2001, "end": 2006, "gain": 473.79999999999995, "loss": 0, "net": 473.79999999999995 },
        { "region": "Midwest", "sector": "Developed", "start": 2006, "end": 2011, "gain": 292.59999999999997, "loss": 0, "net": 292.59999999999997 },
        { "region": "Midwest", "sector": "Forest", "start": 1973, "end": 1980, "gain": 408.57142857142856, "loss": 906.8571428571429, "net": -498.28571428571433 },
        { "region": "Midwest", "sector": "Forest", "start": 1980, "end": 1986, "gain": 632.8333333333334, "loss": 1163.3333333333333, "net": -530.4999999999999 },
        { "region": "Midwest", "sector": "Forest", "start": 1986, "end": 1992, "gain": 822.8333333333334, "loss": 1252, "net": -429.16666666666663 },
        { "region": "Midwest", "sector": "Forest", "start": 1992, "end": 2000, "gain": 898.25, "loss": 1143, "net": -244.75 },
        { "region": "Midwest", "sector": "Forest", "start": 2001, "end": 2006, "gain": 99.2, "loss": 515.6, "net": -416.40000000000003 },
        { "region": "Midwest", "sector": "Forest", "start": 2006, "end": 2011, "gain": 275.4, "loss": 722.6, "net": -447.20000000000005 },
        { "region": "Midwest", "sector": "Grassland/Shrubland", "start": 1973, "end": 1980, "gain": 452.8571428571429, "loss": 262.14285714285717, "net": 190.71428571428572 },
        { "region": "Midwest", "sector": "Grassland/Shrubland", "start": 1980, "end": 1986, "gain": 666.5, "loss": 458.1666666666667, "net": 208.33333333333331 },
        { "region": "Midwest", "sector": "Grassland/Shrubland", "start": 1986, "end": 1992, "gain": 1063.1666666666665, "loss": 480, "net": 583.1666666666665 },
        { "region": "Midwest", "sector": "Grassland/Shrubland", "start": 1992, "end": 2000, "gain": 750.625, "loss": 617.25, "net": 133.375 },
        { "region": "Midwest", "sector": "Grassland/Shrubland", "start": 2001, "end": 2006, "gain": 389.6, "loss": 164.2, "net": 225.40000000000003 },
        { "region": "Midwest", "sector": "Grassland/Shrubland", "start": 2006, "end": 2011, "gain": 614.4, "loss": 359.4, "net": 255 },
        { "region": "Midwest", "sector": "Mechanically disturbed", "start": 1973, "end": 1980, "gain": 435.57142857142856, "loss": 441.42857142857144, "net": -5.85714285714289 },
        { "region": "Midwest", "sector": "Mechanically disturbed", "start": 1980, "end": 1986, "gain": 788.6666666666667, "loss": 496.5, "net": 292.16666666666674 },
        { "region": "Midwest", "sector": "Mechanically disturbed", "start": 1986, "end": 1992, "gain": 886.8333333333334, "loss": 798, "net": 88.83333333333337 },
        { "region": "Midwest", "sector": "Mechanically disturbed", "start": 1992, "end": 2000, "gain": 862.625, "loss": 666.625, "net": 196 },
        { "region": "Midwest", "sector": "Mechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Mechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Nonmechanically disturbed", "start": 1973, "end": 1980, "gain": 88, "loss": 0, "net": 88 },
        { "region": "Midwest", "sector": "Nonmechanically disturbed", "start": 1980, "end": 1986, "gain": 0, "loss": 102.83333333333334, "net": -102.83333333333334 },
        { "region": "Midwest", "sector": "Nonmechanically disturbed", "start": 1986, "end": 1992, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Nonmechanically disturbed", "start": 1992, "end": 2000, "gain": 10.625, "loss": 0, "net": 10.625 },
        { "region": "Midwest", "sector": "Nonmechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Nonmechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Snow/Ice", "start": 1973, "end": 1980, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Snow/Ice", "start": 1980, "end": 1986, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Snow/Ice", "start": 1986, "end": 1992, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Snow/Ice", "start": 1992, "end": 2000, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Snow/Ice", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Snow/Ice", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Midwest", "sector": "Water", "start": 1973, "end": 1980, "gain": 85.42857142857143, "loss": 80.28571428571429, "net": 5.142857142857139 },
        { "region": "Midwest", "sector": "Water", "start": 1980, "end": 1986, "gain": 152.83333333333334, "loss": 62.5, "net": 90.33333333333334 },
        { "region": "Midwest", "sector": "Water", "start": 1986, "end": 1992, "gain": 105.66666666666666, "loss": 104, "net": 1.6666666666666572 },
        { "region": "Midwest", "sector": "Water", "start": 1992, "end": 2000, "gain": 126.75, "loss": 72.75, "net": 54 },
        { "region": "Midwest", "sector": "Water", "start": 2001, "end": 2006, "gain": 96.8, "loss": 48.2, "net": 48.599999999999994 },
        { "region": "Midwest", "sector": "Water", "start": 2006, "end": 2011, "gain": 114.2, "loss": 29.200000000000003, "net": 85 },
        { "region": "Midwest", "sector": "Wetland", "start": 1973, "end": 1980, "gain": 86.85714285714286, "loss": 126.28571428571429, "net": -39.42857142857143 },
        { "region": "Midwest", "sector": "Wetland", "start": 1980, "end": 1986, "gain": 112.16666666666667, "loss": 174.16666666666666, "net": -61.999999999999986 },
        { "region": "Midwest", "sector": "Wetland", "start": 1986, "end": 1992, "gain": 177.33333333333334, "loss": 158, "net": 19.333333333333343 },
        { "region": "Midwest", "sector": "Wetland", "start": 1992, "end": 2000, "gain": 114.875, "loss": 128.375, "net": -13.5 },
        { "region": "Midwest", "sector": "Wetland", "start": 2001, "end": 2006, "gain": 188.6, "loss": 75.2, "net": 113.39999999999999 },
        { "region": "Midwest", "sector": "Wetland", "start": 2006, "end": 2011, "gain": 58, "loss": 69, "net": -11 },
        { "region": "Northeast", "sector": "Agriculture", "start": 1973, "end": 1980, "gain": 85.57142857142858, "loss": 184.71428571428572, "net": -99.14285714285714 },
        { "region": "Northeast", "sector": "Agriculture", "start": 1980, "end": 1986, "gain": 94, "loss": 240.5, "net": -146.5 },
        { "region": "Northeast", "sector": "Agriculture", "start": 1986, "end": 1992, "gain": 77, "loss": 326, "net": -249 },
        { "region": "Northeast", "sector": "Agriculture", "start": 1992, "end": 2000, "gain": 48.5, "loss": 238.125, "net": -189.625 },
        { "region": "Northeast", "sector": "Agriculture", "start": 2001, "end": 2006, "gain": 32.2, "loss": 130.6, "net": -98.39999999999999 },
        { "region": "Northeast", "sector": "Agriculture", "start": 2006, "end": 2011, "gain": 21.2, "loss": 117.4, "net": -96.2 },
        { "region": "Northeast", "sector": "Barren", "start": 1973, "end": 1980, "gain": 0.7142857142857143, "loss": 1.1428571428571428, "net": -0.4285714285714285 },
        { "region": "Northeast", "sector": "Barren", "start": 1980, "end": 1986, "gain": 1.1666666666666667, "loss": 1.6666666666666665, "net": -0.4999999999999998 },
        { "region": "Northeast", "sector": "Barren", "start": 1986, "end": 1992, "gain": 1.3333333333333333, "loss": 1.3333333333333333, "net": 0 },
        { "region": "Northeast", "sector": "Barren", "start": 1992, "end": 2000, "gain": 1, "loss": 1.25, "net": -0.25 },
        { "region": "Northeast", "sector": "Barren", "start": 2001, "end": 2006, "gain": 52.6, "loss": 27.599999999999998, "net": 25.000000000000004 },
        { "region": "Northeast", "sector": "Barren", "start": 2006, "end": 2011, "gain": 69.8, "loss": 27.6, "net": 42.199999999999996 },
        { "region": "Northeast", "sector": "Developed", "start": 1973, "end": 1980, "gain": 199.57142857142856, "loss": 0.42857142857142855, "net": 199.14285714285714 },
        { "region": "Northeast", "sector": "Developed", "start": 1980, "end": 1986, "gain": 229, "loss": 1.1666666666666665, "net": 227.83333333333334 },
        { "region": "Northeast", "sector": "Developed", "start": 1986, "end": 1992, "gain": 328.66666666666663, "loss": 2, "net": 326.66666666666663 },
        { "region": "Northeast", "sector": "Developed", "start": 1992, "end": 2000, "gain": 328.125, "loss": 1.375, "net": 326.75 },
        { "region": "Northeast", "sector": "Developed", "start": 2001, "end": 2006, "gain": 263.2, "loss": 0, "net": 263.2 },
        { "region": "Northeast", "sector": "Developed", "start": 2006, "end": 2011, "gain": 193.79999999999998, "loss": 0, "net": 193.79999999999998 },
        { "region": "Northeast", "sector": "Forest", "start": 1973, "end": 1980, "gain": 273.2857142857143, "loss": 706.1428571428571, "net": -432.85714285714283 },
        { "region": "Northeast", "sector": "Forest", "start": 1980, "end": 1986, "gain": 475.66666666666663, "loss": 1048.3333333333333, "net": -572.6666666666666 },
        { "region": "Northeast", "sector": "Forest", "start": 1986, "end": 1992, "gain": 765.8333333333334, "loss": 1205, "net": -439.16666666666663 },
        { "region": "Northeast", "sector": "Forest", "start": 1992, "end": 2000, "gain": 778.625, "loss": 994.625, "net": -216 },
        { "region": "Northeast", "sector": "Forest", "start": 2001, "end": 2006, "gain": 116.39999999999999, "loss": 504.40000000000003, "net": -388.00000000000006 },
        { "region": "Northeast", "sector": "Forest", "start": 2006, "end": 2011, "gain": 311.59999999999997, "loss": 605.1999999999999, "net": -293.59999999999997 },
        { "region": "Northeast", "sector": "Grassland/Shrubland", "start": 1973, "end": 1980, "gain": 224.42857142857142, "loss": 57.142857142857146, "net": 167.28571428571428 },
        { "region": "Northeast", "sector": "Grassland/Shrubland", "start": 1980, "end": 1986, "gain": 474.6666666666667, "loss": 222.83333333333331, "net": 251.83333333333337 },
        { "region": "Northeast", "sector": "Grassland/Shrubland", "start": 1986, "end": 1992, "gain": 629.3333333333334, "loss": 420.8333333333333, "net": 208.50000000000006 },
        { "region": "Northeast", "sector": "Grassland/Shrubland", "start": 1992, "end": 2000, "gain": 422.125, "loss": 424.75, "net": -2.625 },
        { "region": "Northeast", "sector": "Grassland/Shrubland", "start": 2001, "end": 2006, "gain": 356.8, "loss": 134.2, "net": 222.60000000000002 },
        { "region": "Northeast", "sector": "Grassland/Shrubland", "start": 2006, "end": 2011, "gain": 482.2, "loss": 329.59999999999997, "net": 152.60000000000002 },
        { "region": "Northeast", "sector": "Mechanically disturbed", "start": 1973, "end": 1980, "gain": 445, "loss": 286.57142857142856, "net": 158.42857142857144 },
        { "region": "Northeast", "sector": "Mechanically disturbed", "start": 1980, "end": 1986, "gain": 742.1666666666666, "loss": 528, "net": 214.16666666666663 },
        { "region": "Northeast", "sector": "Mechanically disturbed", "start": 1986, "end": 1992, "gain": 888.6666666666667, "loss": 723.6666666666666, "net": 165.0000000000001 },
        { "region": "Northeast", "sector": "Mechanically disturbed", "start": 1992, "end": 2000, "gain": 703.375, "loss": 682, "net": 21.375 },
        { "region": "Northeast", "sector": "Mechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Mechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Nonmechanically disturbed", "start": 1973, "end": 1980, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Nonmechanically disturbed", "start": 1980, "end": 1986, "gain": 19.166666666666668, "loss": 0, "net": 19.166666666666668 },
        { "region": "Northeast", "sector": "Nonmechanically disturbed", "start": 1986, "end": 1992, "gain": 0, "loss": 14.5, "net": -14.5 },
        { "region": "Northeast", "sector": "Nonmechanically disturbed", "start": 1992, "end": 2000, "gain": 0, "loss": 3.25, "net": -3.25 },
        { "region": "Northeast", "sector": "Nonmechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Nonmechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Snow/Ice", "start": 1973, "end": 1980, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Snow/Ice", "start": 1980, "end": 1986, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Snow/Ice", "start": 1986, "end": 1992, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Snow/Ice", "start": 1992, "end": 2000, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Snow/Ice", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Snow/Ice", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northeast", "sector": "Water", "start": 1973, "end": 1980, "gain": 13.714285714285714, "loss": 3.142857142857143, "net": 10.571428571428571 },
        { "region": "Northeast", "sector": "Water", "start": 1980, "end": 1986, "gain": 12, "loss": 2.8333333333333335, "net": 9.166666666666666 },
        { "region": "Northeast", "sector": "Water", "start": 1986, "end": 1992, "gain": 11, "loss": 3.1666666666666665, "net": 7.833333333333334 },
        { "region": "Northeast", "sector": "Water", "start": 1992, "end": 2000, "gain": 7.5, "loss": 9.5, "net": -2 },
        { "region": "Northeast", "sector": "Water", "start": 2001, "end": 2006, "gain": 8.8, "loss": 15.399999999999999, "net": -6.599999999999998 },
        { "region": "Northeast", "sector": "Water", "start": 2006, "end": 2011, "gain": 13.2, "loss": 11.4, "net": 1.799999999999999 },
        { "region": "Northeast", "sector": "Wetland", "start": 1973, "end": 1980, "gain": 4.428571428571429, "loss": 14.428571428571429, "net": -10 },
        { "region": "Northeast", "sector": "Wetland", "start": 1980, "end": 1986, "gain": 5.333333333333333, "loss": 13.833333333333334, "net": -8.5 },
        { "region": "Northeast", "sector": "Wetland", "start": 1986, "end": 1992, "gain": 5.833333333333333, "loss": 16.5, "net": -10.666666666666668 },
        { "region": "Northeast", "sector": "Wetland", "start": 1992, "end": 2000, "gain": 11, "loss": 21, "net": -10 },
        { "region": "Northeast", "sector": "Wetland", "start": 2001, "end": 2006, "gain": 13.799999999999999, "loss": 31.6, "net": -17.800000000000004 },
        { "region": "Northeast", "sector": "Wetland", "start": 2006, "end": 2011, "gain": 18.8, "loss": 19.4, "net": -0.5999999999999979 },
        { "region": "Northern Great Plains", "sector": "Agriculture", "start": 1973, "end": 1980, "gain": 1392.7142857142858, "loss": 689.8571428571429, "net": 702.8571428571429 },
        { "region": "Northern Great Plains", "sector": "Agriculture", "start": 1980, "end": 1986, "gain": 1409.3333333333335, "loss": 883.5, "net": 525.8333333333335 },
        { "region": "Northern Great Plains", "sector": "Agriculture", "start": 1986, "end": 1992, "gain": 631.3333333333334, "loss": 3596.833333333333, "net": -2965.4999999999995 },
        { "region": "Northern Great Plains", "sector": "Agriculture", "start": 1992, "end": 2000, "gain": 1132.625, "loss": 1827.375, "net": -694.75 },
        { "region": "Northern Great Plains", "sector": "Agriculture", "start": 2001, "end": 2006, "gain": 508.2, "loss": 359.8, "net": 148.39999999999998 },
        { "region": "Northern Great Plains", "sector": "Agriculture", "start": 2006, "end": 2011, "gain": 433.20000000000005, "loss": 233.2, "net": 200.00000000000006 },
        { "region": "Northern Great Plains", "sector": "Barren", "start": 1973, "end": 1980, "gain": 4, "loss": 22.857142857142854, "net": -18.857142857142854 },
        { "region": "Northern Great Plains", "sector": "Barren", "start": 1980, "end": 1986, "gain": 22.5, "loss": 12.333333333333334, "net": 10.166666666666666 },
        { "region": "Northern Great Plains", "sector": "Barren", "start": 1986, "end": 1992, "gain": 85.33333333333333, "loss": 18.666666666666668, "net": 66.66666666666666 },
        { "region": "Northern Great Plains", "sector": "Barren", "start": 1992, "end": 2000, "gain": 37.75, "loss": 35.375, "net": 2.375 },
        { "region": "Northern Great Plains", "sector": "Barren", "start": 2001, "end": 2006, "gain": 59.8, "loss": 45.2, "net": 14.599999999999994 },
        { "region": "Northern Great Plains", "sector": "Barren", "start": 2006, "end": 2011, "gain": 37.4, "loss": 56.400000000000006, "net": -19.000000000000007 },
        { "region": "Northern Great Plains", "sector": "Developed", "start": 1973, "end": 1980, "gain": 85.42857142857143, "loss": 0.14285714285714285, "net": 85.28571428571429 },
        { "region": "Northern Great Plains", "sector": "Developed", "start": 1980, "end": 1986, "gain": 43, "loss": 0, "net": 43 },
        { "region": "Northern Great Plains", "sector": "Developed", "start": 1986, "end": 1992, "gain": 77.5, "loss": 0.3333333333333333, "net": 77.16666666666667 },
        { "region": "Northern Great Plains", "sector": "Developed", "start": 1992, "end": 2000, "gain": 74.75, "loss": 0, "net": 74.75 },
        { "region": "Northern Great Plains", "sector": "Developed", "start": 2001, "end": 2006, "gain": 52.800000000000004, "loss": 0, "net": 52.800000000000004 },
        { "region": "Northern Great Plains", "sector": "Developed", "start": 2006, "end": 2011, "gain": 40, "loss": 0, "net": 40 },
        { "region": "Northern Great Plains", "sector": "Forest", "start": 1973, "end": 1980, "gain": 80.42857142857143, "loss": 205.85714285714286, "net": -125.42857142857143 },
        { "region": "Northern Great Plains", "sector": "Forest", "start": 1980, "end": 1986, "gain": 122.66666666666666, "loss": 394, "net": -271.33333333333337 },
        { "region": "Northern Great Plains", "sector": "Forest", "start": 1986, "end": 1992, "gain": 107.16666666666667, "loss": 1065.1666666666667, "net": -958.0000000000001 },
        { "region": "Northern Great Plains", "sector": "Forest", "start": 1992, "end": 2000, "gain": 277.125, "loss": 451.5, "net": -174.375 },
        { "region": "Northern Great Plains", "sector": "Forest", "start": 2001, "end": 2006, "gain": 47.800000000000004, "loss": 742.4000000000001, "net": -694.6000000000001 },
        { "region": "Northern Great Plains", "sector": "Forest", "start": 2006, "end": 2011, "gain": 35.4, "loss": 553.2, "net": -517.8000000000001 },
        { "region": "Northern Great Plains", "sector": "Grassland/Shrubland", "start": 1973, "end": 1980, "gain": 1089.4285714285716, "loss": 1433, "net": -343.57142857142844 },
        { "region": "Northern Great Plains", "sector": "Grassland/Shrubland", "start": 1980, "end": 1986, "gain": 1046.1666666666667, "loss": 1504.3333333333335, "net": -458.16666666666674 },
        { "region": "Northern Great Plains", "sector": "Grassland/Shrubland", "start": 1986, "end": 1992, "gain": 3943, "loss": 876.5, "net": 3066.5 },
        { "region": "Northern Great Plains", "sector": "Grassland/Shrubland", "start": 1992, "end": 2000, "gain": 2382.375, "loss": 1459.75, "net": 922.625 },
        { "region": "Northern Great Plains", "sector": "Grassland/Shrubland", "start": 2001, "end": 2006, "gain": 1329.6000000000001, "loss": 593.4, "net": 736.2000000000002 },
        { "region": "Northern Great Plains", "sector": "Grassland/Shrubland", "start": 2006, "end": 2011, "gain": 625.2, "loss": 745.6, "net": -120.39999999999998 },
        { "region": "Northern Great Plains", "sector": "Mechanically disturbed", "start": 1973, "end": 1980, "gain": 189.28571428571428, "loss": 290.7142857142857, "net": -101.42857142857144 },
        { "region": "Northern Great Plains", "sector": "Mechanically disturbed", "start": 1980, "end": 1986, "gain": 323.5, "loss": 220.5, "net": 103 },
        { "region": "Northern Great Plains", "sector": "Mechanically disturbed", "start": 1986, "end": 1992, "gain": 361.3333333333333, "loss": 323.1666666666667, "net": 38.16666666666663 },
        { "region": "Northern Great Plains", "sector": "Mechanically disturbed", "start": 1992, "end": 2000, "gain": 189.25, "loss": 271.5, "net": -82.25 },
        { "region": "Northern Great Plains", "sector": "Mechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northern Great Plains", "sector": "Mechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northern Great Plains", "sector": "Nonmechanically disturbed", "start": 1973, "end": 1980, "gain": 10, "loss": 198.57142857142858, "net": -188.57142857142858 },
        { "region": "Northern Great Plains", "sector": "Nonmechanically disturbed", "start": 1980, "end": 1986, "gain": 4.666666666666667, "loss": 11.666666666666666, "net": -6.999999999999999 },
        { "region": "Northern Great Plains", "sector": "Nonmechanically disturbed", "start": 1986, "end": 1992, "gain": 885.3333333333334, "loss": 4.666666666666667, "net": 880.6666666666667 },
        { "region": "Northern Great Plains", "sector": "Nonmechanically disturbed", "start": 1992, "end": 2000, "gain": 315.75, "loss": 664, "net": -348.25 },
        { "region": "Northern Great Plains", "sector": "Nonmechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northern Great Plains", "sector": "Nonmechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northern Great Plains", "sector": "Snow/Ice", "start": 1973, "end": 1980, "gain": 0, "loss": 0.8571428571428571, "net": -0.8571428571428571 },
        { "region": "Northern Great Plains", "sector": "Snow/Ice", "start": 1980, "end": 1986, "gain": 0, "loss": 1.1666666666666665, "net": -1.1666666666666665 },
        { "region": "Northern Great Plains", "sector": "Snow/Ice", "start": 1986, "end": 1992, "gain": 0.16666666666666666, "loss": 0.6666666666666666, "net": -0.5 },
        { "region": "Northern Great Plains", "sector": "Snow/Ice", "start": 1992, "end": 2000, "gain": 0, "loss": 3.875, "net": -3.875 },
        { "region": "Northern Great Plains", "sector": "Snow/Ice", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northern Great Plains", "sector": "Snow/Ice", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northern Great Plains", "sector": "Water", "start": 1973, "end": 1980, "gain": 117.42857142857142, "loss": 199.28571428571428, "net": -81.85714285714286 },
        { "region": "Northern Great Plains", "sector": "Water", "start": 1980, "end": 1986, "gain": 262.3333333333333, "loss": 107.16666666666667, "net": 155.16666666666663 },
        { "region": "Northern Great Plains", "sector": "Water", "start": 1986, "end": 1992, "gain": 209.5, "loss": 507, "net": -297.5 },
        { "region": "Northern Great Plains", "sector": "Water", "start": 1992, "end": 2000, "gain": 777, "loss": 54.875, "net": 722.125 },
        { "region": "Northern Great Plains", "sector": "Water", "start": 2001, "end": 2006, "gain": 82, "loss": 405.6, "net": -323.6 },
        { "region": "Northern Great Plains", "sector": "Water", "start": 2006, "end": 2011, "gain": 620.8000000000001, "loss": 11.6, "net": 609.2 },
        { "region": "Northern Great Plains", "sector": "Wetland", "start": 1973, "end": 1980, "gain": 195.14285714285714, "loss": 135, "net": 60.14285714285714 },
        { "region": "Northern Great Plains", "sector": "Wetland", "start": 1980, "end": 1986, "gain": 124.66666666666667, "loss": 230.5, "net": -105.83333333333333 },
        { "region": "Northern Great Plains", "sector": "Wetland", "start": 1986, "end": 1992, "gain": 303.8333333333333, "loss": 220, "net": 83.83333333333331 },
        { "region": "Northern Great Plains", "sector": "Wetland", "start": 1992, "end": 2000, "gain": 161.375, "loss": 591.125, "net": -429.75 },
        { "region": "Northern Great Plains", "sector": "Wetland", "start": 2001, "end": 2006, "gain": 399.6, "loss": 333.40000000000003, "net": 66.19999999999999 },
        { "region": "Northern Great Plains", "sector": "Wetland", "start": 2006, "end": 2011, "gain": 76.6, "loss": 268.6, "net": -192.00000000000003 },
        { "region": "Northwest", "sector": "Agriculture", "start": 1973, "end": 1980, "gain": 402.2857142857143, "loss": 182.42857142857144, "net": 219.85714285714283 },
        { "region": "Northwest", "sector": "Agriculture", "start": 1980, "end": 1986, "gain": 281.16666666666663, "loss": 282.6666666666667, "net": -1.5000000000000568 },
        { "region": "Northwest", "sector": "Agriculture", "start": 1986, "end": 1992, "gain": 209.66666666666666, "loss": 811.8333333333334, "net": -602.1666666666667 },
        { "region": "Northwest", "sector": "Agriculture", "start": 1992, "end": 2000, "gain": 210.375, "loss": 235.5, "net": -25.125 },
        { "region": "Northwest", "sector": "Agriculture", "start": 2001, "end": 2006, "gain": 72.39999999999999, "loss": 151, "net": -78.60000000000001 },
        { "region": "Northwest", "sector": "Agriculture", "start": 2006, "end": 2011, "gain": 99.2, "loss": 46.6, "net": 52.6 },
        { "region": "Northwest", "sector": "Barren", "start": 1973, "end": 1980, "gain": 8.142857142857142, "loss": 10, "net": -1.8571428571428577 },
        { "region": "Northwest", "sector": "Barren", "start": 1980, "end": 1986, "gain": 7.166666666666667, "loss": 13.166666666666666, "net": -5.999999999999999 },
        { "region": "Northwest", "sector": "Barren", "start": 1986, "end": 1992, "gain": 10.666666666666666, "loss": 9, "net": 1.666666666666666 },
        { "region": "Northwest", "sector": "Barren", "start": 1992, "end": 2000, "gain": 12.875, "loss": 8.625, "net": 4.25 },
        { "region": "Northwest", "sector": "Barren", "start": 2001, "end": 2006, "gain": 251.39999999999998, "loss": 238.79999999999998, "net": 12.599999999999994 },
        { "region": "Northwest", "sector": "Barren", "start": 2006, "end": 2011, "gain": 139.6, "loss": 242.6, "net": -103 },
        { "region": "Northwest", "sector": "Developed", "start": 1973, "end": 1980, "gain": 107.28571428571429, "loss": 1.2857142857142856, "net": 106 },
        { "region": "Northwest", "sector": "Developed", "start": 1980, "end": 1986, "gain": 109.66666666666666, "loss": 2.833333333333333, "net": 106.83333333333333 },
        { "region": "Northwest", "sector": "Developed", "start": 1986, "end": 1992, "gain": 146.5, "loss": 1.1666666666666665, "net": 145.33333333333334 },
        { "region": "Northwest", "sector": "Developed", "start": 1992, "end": 2000, "gain": 129.25, "loss": 0.75, "net": 128.5 },
        { "region": "Northwest", "sector": "Developed", "start": 2001, "end": 2006, "gain": 57.8, "loss": 0, "net": 57.8 },
        { "region": "Northwest", "sector": "Developed", "start": 2006, "end": 2011, "gain": 34.8, "loss": 0, "net": 34.8 },
        { "region": "Northwest", "sector": "Forest", "start": 1973, "end": 1980, "gain": 641.8571428571429, "loss": 1058, "net": -416.1428571428571 },
        { "region": "Northwest", "sector": "Forest", "start": 1980, "end": 1986, "gain": 1122, "loss": 1533.6666666666667, "net": -411.66666666666674 },
        { "region": "Northwest", "sector": "Forest", "start": 1986, "end": 1992, "gain": 1311, "loss": 1943.3333333333335, "net": -632.3333333333335 },
        { "region": "Northwest", "sector": "Forest", "start": 1992, "end": 2000, "gain": 1351.875, "loss": 2122.375, "net": -770.5 },
        { "region": "Northwest", "sector": "Forest", "start": 2001, "end": 2006, "gain": 207.8, "loss": 1281.2, "net": -1073.4 },
        { "region": "Northwest", "sector": "Forest", "start": 2006, "end": 2011, "gain": 129.2, "loss": 1559.3999999999999, "net": -1430.1999999999998 },
        { "region": "Northwest", "sector": "Grassland/Shrubland", "start": 1973, "end": 1980, "gain": 1091, "loss": 624.2857142857143, "net": 466.71428571428567 },
        { "region": "Northwest", "sector": "Grassland/Shrubland", "start": 1980, "end": 1986, "gain": 1039.5, "loss": 1277.8333333333333, "net": -238.33333333333326 },
        { "region": "Northwest", "sector": "Grassland/Shrubland", "start": 1986, "end": 1992, "gain": 1924.6666666666667, "loss": 1545.3333333333335, "net": 379.33333333333326 },
        { "region": "Northwest", "sector": "Grassland/Shrubland", "start": 1992, "end": 2000, "gain": 1148, "loss": 1383.375, "net": -235.375 },
        { "region": "Northwest", "sector": "Grassland/Shrubland", "start": 2001, "end": 2006, "gain": 1368.8, "loss": 363, "net": 1005.8 },
        { "region": "Northwest", "sector": "Grassland/Shrubland", "start": 2006, "end": 2011, "gain": 1684.3999999999999, "loss": 257.8, "net": 1426.6 },
        { "region": "Northwest", "sector": "Mechanically disturbed", "start": 1973, "end": 1980, "gain": 1013, "loss": 1221.142857142857, "net": -208.1428571428571 },
        { "region": "Northwest", "sector": "Mechanically disturbed", "start": 1980, "end": 1986, "gain": 1375.6666666666667, "loss": 1182.5, "net": 193.16666666666674 },
        { "region": "Northwest", "sector": "Mechanically disturbed", "start": 1986, "end": 1992, "gain": 1869, "loss": 1377.5, "net": 491.5 },
        { "region": "Northwest", "sector": "Mechanically disturbed", "start": 1992, "end": 2000, "gain": 1129.5, "loss": 1405.25, "net": -275.75 },
        { "region": "Northwest", "sector": "Mechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northwest", "sector": "Mechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northwest", "sector": "Nonmechanically disturbed", "start": 1973, "end": 1980, "gain": 8.714285714285714, "loss": 157, "net": -148.28571428571428 },
        { "region": "Northwest", "sector": "Nonmechanically disturbed", "start": 1980, "end": 1986, "gain": 295.8333333333333, "loss": 10.333333333333332, "net": 285.5 },
        { "region": "Northwest", "sector": "Nonmechanically disturbed", "start": 1986, "end": 1992, "gain": 577, "loss": 279.8333333333333, "net": 297.1666666666667 },
        { "region": "Northwest", "sector": "Nonmechanically disturbed", "start": 1992, "end": 2000, "gain": 1393.125, "loss": 272.75, "net": 1120.375 },
        { "region": "Northwest", "sector": "Nonmechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northwest", "sector": "Nonmechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northwest", "sector": "Snow/Ice", "start": 1973, "end": 1980, "gain": 0, "loss": 1.2857142857142858, "net": -1.2857142857142858 },
        { "region": "Northwest", "sector": "Snow/Ice", "start": 1980, "end": 1986, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northwest", "sector": "Snow/Ice", "start": 1986, "end": 1992, "gain": 0.5, "loss": 0.6666666666666666, "net": -0.16666666666666663 },
        { "region": "Northwest", "sector": "Snow/Ice", "start": 1992, "end": 2000, "gain": 0, "loss": 1.125, "net": -1.125 },
        { "region": "Northwest", "sector": "Snow/Ice", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northwest", "sector": "Snow/Ice", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Northwest", "sector": "Water", "start": 1973, "end": 1980, "gain": 35.714285714285715, "loss": 52.85714285714286, "net": -17.142857142857146 },
        { "region": "Northwest", "sector": "Water", "start": 1980, "end": 1986, "gain": 76.33333333333333, "loss": 14.166666666666666, "net": 62.166666666666664 },
        { "region": "Northwest", "sector": "Water", "start": 1986, "end": 1992, "gain": 10.5, "loss": 129.5, "net": -119 },
        { "region": "Northwest", "sector": "Water", "start": 1992, "end": 2000, "gain": 48.25, "loss": 9.25, "net": 39 },
        { "region": "Northwest", "sector": "Water", "start": 2001, "end": 2006, "gain": 58.6, "loss": 28.2, "net": 30.400000000000002 },
        { "region": "Northwest", "sector": "Water", "start": 2006, "end": 2011, "gain": 30, "loss": 25.8, "net": 4.199999999999999 },
        { "region": "Northwest", "sector": "Wetland", "start": 1973, "end": 1980, "gain": 19, "loss": 26.285714285714285, "net": -7.285714285714285 },
        { "region": "Northwest", "sector": "Wetland", "start": 1980, "end": 1986, "gain": 34, "loss": 32.33333333333333, "net": 1.6666666666666714 },
        { "region": "Northwest", "sector": "Wetland", "start": 1986, "end": 1992, "gain": 53.833333333333336, "loss": 21.666666666666668, "net": 32.16666666666667 },
        { "region": "Northwest", "sector": "Wetland", "start": 1992, "end": 2000, "gain": 27.125, "loss": 20.875, "net": 6.25 },
        { "region": "Northwest", "sector": "Wetland", "start": 2001, "end": 2006, "gain": 74.2, "loss": 28.8, "net": 45.400000000000006 },
        { "region": "Northwest", "sector": "Wetland", "start": 2006, "end": 2011, "gain": 30.2, "loss": 15.200000000000001, "net": 14.999999999999998 },
        { "region": "Southeast", "sector": "Agriculture", "start": 1973, "end": 1980, "gain": 898.2857142857142, "loss": 705.5714285714286, "net": 192.71428571428567 },
        { "region": "Southeast", "sector": "Agriculture", "start": 1980, "end": 1986, "gain": 774.5, "loss": 1473.8333333333333, "net": -699.3333333333333 },
        { "region": "Southeast", "sector": "Agriculture", "start": 1986, "end": 1992, "gain": 514.3333333333334, "loss": 2525.1666666666665, "net": -2010.833333333333 },
        { "region": "Southeast", "sector": "Agriculture", "start": 1992, "end": 2000, "gain": 490.75, "loss": 1392.625, "net": -901.875 },
        { "region": "Southeast", "sector": "Agriculture", "start": 2001, "end": 2006, "gain": 299.2, "loss": 1436, "net": -1136.8 },
        { "region": "Southeast", "sector": "Agriculture", "start": 2006, "end": 2011, "gain": 272.6, "loss": 806.2, "net": -533.6 },
        { "region": "Southeast", "sector": "Barren", "start": 1973, "end": 1980, "gain": 11.571428571428571, "loss": 20.142857142857142, "net": -8.571428571428571 },
        { "region": "Southeast", "sector": "Barren", "start": 1980, "end": 1986, "gain": 13.333333333333334, "loss": 21.166666666666668, "net": -7.833333333333334 },
        { "region": "Southeast", "sector": "Barren", "start": 1986, "end": 1992, "gain": 10.333333333333332, "loss": 23.166666666666668, "net": -12.833333333333336 },
        { "region": "Southeast", "sector": "Barren", "start": 1992, "end": 2000, "gain": 15.5, "loss": 6.75, "net": 8.75 },
        { "region": "Southeast", "sector": "Barren", "start": 2001, "end": 2006, "gain": 208, "loss": 186.4, "net": 21.599999999999994 },
        { "region": "Southeast", "sector": "Barren", "start": 2006, "end": 2011, "gain": 236.4, "loss": 126.4, "net": 110 },
        { "region": "Southeast", "sector": "Developed", "start": 1973, "end": 1980, "gain": 887.1428571428571, "loss": 4.571428571428571, "net": 882.5714285714286 },
        { "region": "Southeast", "sector": "Developed", "start": 1980, "end": 1986, "gain": 1053.3333333333333, "loss": 15.166666666666666, "net": 1038.1666666666665 },
        { "region": "Southeast", "sector": "Developed", "start": 1986, "end": 1992, "gain": 1266.8333333333333, "loss": 18.666666666666668, "net": 1248.1666666666665 },
        { "region": "Southeast", "sector": "Developed", "start": 1992, "end": 2000, "gain": 1412.125, "loss": 7.625, "net": 1404.5 },
        { "region": "Southeast", "sector": "Developed", "start": 2001, "end": 2006, "gain": 943.8, "loss": 0, "net": 943.8 },
        { "region": "Southeast", "sector": "Developed", "start": 2006, "end": 2011, "gain": 469.4, "loss": 0, "net": 469.4 },
        { "region": "Southeast", "sector": "Forest", "start": 1973, "end": 1980, "gain": 2441.857142857143, "loss": 4369, "net": -1927.1428571428569 },
        { "region": "Southeast", "sector": "Forest", "start": 1980, "end": 1986, "gain": 3890, "loss": 5218.333333333333, "net": -1328.333333333333 },
        { "region": "Southeast", "sector": "Forest", "start": 1986, "end": 1992, "gain": 5743.5, "loss": 6478.666666666667, "net": -735.166666666667 },
        { "region": "Southeast", "sector": "Forest", "start": 1992, "end": 2000, "gain": 4996, "loss": 6042.875, "net": -1046.875 },
        { "region": "Southeast", "sector": "Forest", "start": 2001, "end": 2006, "gain": 2723.2, "loss": 5020, "net": -2296.8 },
        { "region": "Southeast", "sector": "Forest", "start": 2006, "end": 2011, "gain": 3494.4, "loss": 6674.8, "net": -3180.4 },
        { "region": "Southeast", "sector": "Grassland/Shrubland", "start": 1973, "end": 1980, "gain": 582.7142857142857, "loss": 366.5714285714286, "net": 216.14285714285705 },
        { "region": "Southeast", "sector": "Grassland/Shrubland", "start": 1980, "end": 1986, "gain": 1010.6666666666666, "loss": 607.3333333333333, "net": 403.33333333333337 },
        { "region": "Southeast", "sector": "Grassland/Shrubland", "start": 1986, "end": 1992, "gain": 1059.8333333333333, "loss": 851, "net": 208.83333333333326 },
        { "region": "Southeast", "sector": "Grassland/Shrubland", "start": 1992, "end": 2000, "gain": 577.125, "loss": 701.25, "net": -124.125 },
        { "region": "Southeast", "sector": "Grassland/Shrubland", "start": 2001, "end": 2006, "gain": 5012.4, "loss": 2445, "net": 2567.3999999999996 },
        { "region": "Southeast", "sector": "Grassland/Shrubland", "start": 2006, "end": 2011, "gain": 6650, "loss": 3526, "net": 3124 },
        { "region": "Southeast", "sector": "Mechanically disturbed", "start": 1973, "end": 1980, "gain": 2967, "loss": 2338, "net": 629 },
        { "region": "Southeast", "sector": "Mechanically disturbed", "start": 1980, "end": 1986, "gain": 4147.333333333334, "loss": 3437.5, "net": 709.8333333333339 },
        { "region": "Southeast", "sector": "Mechanically disturbed", "start": 1986, "end": 1992, "gain": 5535.833333333334, "loss": 4219.166666666667, "net": 1316.666666666667 },
        { "region": "Southeast", "sector": "Mechanically disturbed", "start": 1992, "end": 2000, "gain": 5081.25, "loss": 4143.375, "net": 937.875 },
        { "region": "Southeast", "sector": "Mechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Mechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Nonmechanically disturbed", "start": 1973, "end": 1980, "gain": 20.57142857142857, "loss": 23, "net": -2.4285714285714306 },
        { "region": "Southeast", "sector": "Nonmechanically disturbed", "start": 1980, "end": 1986, "gain": 58.83333333333333, "loss": 23.833333333333332, "net": 35 },
        { "region": "Southeast", "sector": "Nonmechanically disturbed", "start": 1986, "end": 1992, "gain": 12, "loss": 47.5, "net": -35.5 },
        { "region": "Southeast", "sector": "Nonmechanically disturbed", "start": 1992, "end": 2000, "gain": 146.5, "loss": 17.625, "net": 128.875 },
        { "region": "Southeast", "sector": "Nonmechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Nonmechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Snow/Ice", "start": 1973, "end": 1980, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Snow/Ice", "start": 1980, "end": 1986, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Snow/Ice", "start": 1986, "end": 1992, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Snow/Ice", "start": 1992, "end": 2000, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Snow/Ice", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Snow/Ice", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southeast", "sector": "Water", "start": 1973, "end": 1980, "gain": 385.7142857142857, "loss": 94.57142857142857, "net": 291.14285714285717 },
        { "region": "Southeast", "sector": "Water", "start": 1980, "end": 1986, "gain": 377.8333333333333, "loss": 84.66666666666667, "net": 293.16666666666663 },
        { "region": "Southeast", "sector": "Water", "start": 1986, "end": 1992, "gain": 289.5, "loss": 145.66666666666666, "net": 143.83333333333334 },
        { "region": "Southeast", "sector": "Water", "start": 1992, "end": 2000, "gain": 304.25, "loss": 118, "net": 186.25 },
        { "region": "Southeast", "sector": "Water", "start": 2001, "end": 2006, "gain": 190.4, "loss": 155.2, "net": 35.20000000000002 },
        { "region": "Southeast", "sector": "Water", "start": 2006, "end": 2011, "gain": 199.20000000000002, "loss": 147.6, "net": 51.60000000000002 },
        { "region": "Southeast", "sector": "Wetland", "start": 1973, "end": 1980, "gain": 269.57142857142856, "loss": 694.7142857142857, "net": -425.1428571428571 },
        { "region": "Southeast", "sector": "Wetland", "start": 1980, "end": 1986, "gain": 220.66666666666669, "loss": 661.6666666666666, "net": -440.99999999999994 },
        { "region": "Southeast", "sector": "Wetland", "start": 1986, "end": 1992, "gain": 378.6666666666667, "loss": 385.8333333333333, "net": -7.166666666666629 },
        { "region": "Southeast", "sector": "Wetland", "start": 1992, "end": 2000, "gain": 234.625, "loss": 703.5, "net": -468.875 },
        { "region": "Southeast", "sector": "Wetland", "start": 2001, "end": 2006, "gain": 325.4, "loss": 459.8, "net": -134.40000000000003 },
        { "region": "Southeast", "sector": "Wetland", "start": 2006, "end": 2011, "gain": 233.4, "loss": 274.40000000000003, "net": -41.00000000000003 },
        { "region": "Southern Great Plains", "sector": "Agriculture", "start": 1973, "end": 1980, "gain": 1393.857142857143, "loss": 867.5714285714286, "net": 526.2857142857143 },
        { "region": "Southern Great Plains", "sector": "Agriculture", "start": 1980, "end": 1986, "gain": 926.5, "loss": 1176.5, "net": -250 },
        { "region": "Southern Great Plains", "sector": "Agriculture", "start": 1986, "end": 1992, "gain": 865.8333333333334, "loss": 4552.666666666666, "net": -3686.8333333333326 },
        { "region": "Southern Great Plains", "sector": "Agriculture", "start": 1992, "end": 2000, "gain": 1197, "loss": 1438.75, "net": -241.75 },
        { "region": "Southern Great Plains", "sector": "Agriculture", "start": 2001, "end": 2006, "gain": 253.8, "loss": 237, "net": 16.80000000000001 },
        { "region": "Southern Great Plains", "sector": "Agriculture", "start": 2006, "end": 2011, "gain": 267.8, "loss": 223.20000000000002, "net": 44.599999999999994 },
        { "region": "Southern Great Plains", "sector": "Barren", "start": 1973, "end": 1980, "gain": 34.285714285714285, "loss": 23.428571428571427, "net": 10.857142857142858 },
        { "region": "Southern Great Plains", "sector": "Barren", "start": 1980, "end": 1986, "gain": 19.666666666666668, "loss": 73.16666666666667, "net": -53.5 },
        { "region": "Southern Great Plains", "sector": "Barren", "start": 1986, "end": 1992, "gain": 43.83333333333333, "loss": 38.33333333333333, "net": 5.5 },
        { "region": "Southern Great Plains", "sector": "Barren", "start": 1992, "end": 2000, "gain": 20.5, "loss": 31.75, "net": -11.25 },
        { "region": "Southern Great Plains", "sector": "Barren", "start": 2001, "end": 2006, "gain": 98.6, "loss": 73.2, "net": 25.39999999999999 },
        { "region": "Southern Great Plains", "sector": "Barren", "start": 2006, "end": 2011, "gain": 170.6, "loss": 37.4, "net": 133.2 },
        { "region": "Southern Great Plains", "sector": "Developed", "start": 1973, "end": 1980, "gain": 308.2857142857143, "loss": 0.2857142857142857, "net": 308 },
        { "region": "Southern Great Plains", "sector": "Developed", "start": 1980, "end": 1986, "gain": 265.6666666666667, "loss": 1.1666666666666665, "net": 264.5 },
        { "region": "Southern Great Plains", "sector": "Developed", "start": 1986, "end": 1992, "gain": 270.5, "loss": 1.5, "net": 269 },
        { "region": "Southern Great Plains", "sector": "Developed", "start": 1992, "end": 2000, "gain": 325.5, "loss": 2, "net": 323.5 },
        { "region": "Southern Great Plains", "sector": "Developed", "start": 2001, "end": 2006, "gain": 347, "loss": 0, "net": 347 },
        { "region": "Southern Great Plains", "sector": "Developed", "start": 2006, "end": 2011, "gain": 295.20000000000005, "loss": 0, "net": 295.20000000000005 },
        { "region": "Southern Great Plains", "sector": "Forest", "start": 1973, "end": 1980, "gain": 406, "loss": 729.5714285714286, "net": -323.57142857142856 },
        { "region": "Southern Great Plains", "sector": "Forest", "start": 1980, "end": 1986, "gain": 685.6666666666666, "loss": 1408, "net": -722.3333333333334 },
        { "region": "Southern Great Plains", "sector": "Forest", "start": 1986, "end": 1992, "gain": 1231.6666666666667, "loss": 1090.1666666666667, "net": 141.5 },
        { "region": "Southern Great Plains", "sector": "Forest", "start": 1992, "end": 2000, "gain": 798.375, "loss": 935.5, "net": -137.125 },
        { "region": "Southern Great Plains", "sector": "Forest", "start": 2001, "end": 2006, "gain": 228.2, "loss": 709.1999999999999, "net": -480.99999999999994 },
        { "region": "Southern Great Plains", "sector": "Forest", "start": 2006, "end": 2011, "gain": 391, "loss": 1090.4, "net": -699.4000000000001 },
        { "region": "Southern Great Plains", "sector": "Grassland/Shrubland", "start": 1973, "end": 1980, "gain": 870.2857142857142, "loss": 1548.2857142857144, "net": -678.0000000000002 },
        { "region": "Southern Great Plains", "sector": "Grassland/Shrubland", "start": 1980, "end": 1986, "gain": 1259, "loss": 1177.6666666666667, "net": 81.33333333333326 },
        { "region": "Southern Great Plains", "sector": "Grassland/Shrubland", "start": 1986, "end": 1992, "gain": 4650.166666666666, "loss": 1353.1666666666667, "net": 3296.999999999999 },
        { "region": "Southern Great Plains", "sector": "Grassland/Shrubland", "start": 1992, "end": 2000, "gain": 1580.75, "loss": 1603.125, "net": -22.375 },
        { "region": "Southern Great Plains", "sector": "Grassland/Shrubland", "start": 2001, "end": 2006, "gain": 765.5999999999999, "loss": 707.4, "net": 58.19999999999993 },
        { "region": "Southern Great Plains", "sector": "Grassland/Shrubland", "start": 2006, "end": 2011, "gain": 1062, "loss": 878.8, "net": 183.20000000000005 },
        { "region": "Southern Great Plains", "sector": "Mechanically disturbed", "start": 1973, "end": 1980, "gain": 517.1428571428571, "loss": 410, "net": 107.14285714285711 },
        { "region": "Southern Great Plains", "sector": "Mechanically disturbed", "start": 1980, "end": 1986, "gain": 1179.3333333333333, "loss": 616.5, "net": 562.8333333333333 },
        { "region": "Southern Great Plains", "sector": "Mechanically disturbed", "start": 1986, "end": 1992, "gain": 939.5, "loss": 1208.3333333333335, "net": -268.8333333333335 },
        { "region": "Southern Great Plains", "sector": "Mechanically disturbed", "start": 1992, "end": 2000, "gain": 766.5, "loss": 707.25, "net": 59.25 },
        { "region": "Southern Great Plains", "sector": "Mechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Mechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Nonmechanically disturbed", "start": 1973, "end": 1980, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Nonmechanically disturbed", "start": 1980, "end": 1986, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Nonmechanically disturbed", "start": 1986, "end": 1992, "gain": 13.166666666666666, "loss": 0, "net": 13.166666666666666 },
        { "region": "Southern Great Plains", "sector": "Nonmechanically disturbed", "start": 1992, "end": 2000, "gain": 32.625, "loss": 9.75, "net": 22.875 },
        { "region": "Southern Great Plains", "sector": "Nonmechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Nonmechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Snow/Ice", "start": 1973, "end": 1980, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Snow/Ice", "start": 1980, "end": 1986, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Snow/Ice", "start": 1986, "end": 1992, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Snow/Ice", "start": 1992, "end": 2000, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Snow/Ice", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Snow/Ice", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southern Great Plains", "sector": "Water", "start": 1973, "end": 1980, "gain": 76, "loss": 49.14285714285714, "net": 26.85714285714286 },
        { "region": "Southern Great Plains", "sector": "Water", "start": 1980, "end": 1986, "gain": 156, "loss": 119.5, "net": 36.5 },
        { "region": "Southern Great Plains", "sector": "Water", "start": 1986, "end": 1992, "gain": 212.66666666666669, "loss": 66, "net": 146.66666666666669 },
        { "region": "Southern Great Plains", "sector": "Water", "start": 1992, "end": 2000, "gain": 63.75, "loss": 98.875, "net": -35.125 },
        { "region": "Southern Great Plains", "sector": "Water", "start": 2001, "end": 2006, "gain": 137.6, "loss": 95.2, "net": 42.39999999999999 },
        { "region": "Southern Great Plains", "sector": "Water", "start": 2006, "end": 2011, "gain": 54, "loss": 55.800000000000004, "net": -1.8000000000000043 },
        { "region": "Southern Great Plains", "sector": "Wetland", "start": 1973, "end": 1980, "gain": 46.714285714285715, "loss": 64.85714285714286, "net": -18.142857142857146 },
        { "region": "Southern Great Plains", "sector": "Wetland", "start": 1980, "end": 1986, "gain": 105.83333333333333, "loss": 95, "net": 10.833333333333329 },
        { "region": "Southern Great Plains", "sector": "Wetland", "start": 1986, "end": 1992, "gain": 110, "loss": 73, "net": 37 },
        { "region": "Southern Great Plains", "sector": "Wetland", "start": 1992, "end": 2000, "gain": 68.625, "loss": 71.375, "net": -2.75 },
        { "region": "Southern Great Plains", "sector": "Wetland", "start": 2001, "end": 2006, "gain": 104, "loss": 112.8, "net": -8.799999999999997 },
        { "region": "Southern Great Plains", "sector": "Wetland", "start": 2006, "end": 2011, "gain": 80.4, "loss": 35.4, "net": 45.00000000000001 },
        { "region": "Southwest", "sector": "Agriculture", "start": 1973, "end": 1980, "gain": 922.5714285714287, "loss": 522.4285714285714, "net": 400.1428571428572 },
        { "region": "Southwest", "sector": "Agriculture", "start": 1980, "end": 1986, "gain": 659.6666666666667, "loss": 461, "net": 198.66666666666674 },
        { "region": "Southwest", "sector": "Agriculture", "start": 1986, "end": 1992, "gain": 379.8333333333333, "loss": 1849.8333333333333, "net": -1470 },
        { "region": "Southwest", "sector": "Agriculture", "start": 1992, "end": 2000, "gain": 652.75, "loss": 774.5, "net": -121.75 },
        { "region": "Southwest", "sector": "Agriculture", "start": 2001, "end": 2006, "gain": 282.6, "loss": 379.40000000000003, "net": -96.80000000000001 },
        { "region": "Southwest", "sector": "Agriculture", "start": 2006, "end": 2011, "gain": 132.8, "loss": 137.6, "net": -4.799999999999983 },
        { "region": "Southwest", "sector": "Barren", "start": 1973, "end": 1980, "gain": 13.285714285714285, "loss": 14.571428571428571, "net": -1.2857142857142865 },
        { "region": "Southwest", "sector": "Barren", "start": 1980, "end": 1986, "gain": 8.5, "loss": 12.5, "net": -4 },
        { "region": "Southwest", "sector": "Barren", "start": 1986, "end": 1992, "gain": 7.5, "loss": 8.666666666666666, "net": -1.166666666666666 },
        { "region": "Southwest", "sector": "Barren", "start": 1992, "end": 2000, "gain": 15, "loss": 3.25, "net": 11.75 },
        { "region": "Southwest", "sector": "Barren", "start": 2001, "end": 2006, "gain": 396.20000000000005, "loss": 118.6, "net": 277.6 },
        { "region": "Southwest", "sector": "Barren", "start": 2006, "end": 2011, "gain": 94.2, "loss": 162.8, "net": -68.60000000000001 },
        { "region": "Southwest", "sector": "Developed", "start": 1973, "end": 1980, "gain": 340.8571428571429, "loss": 0.42857142857142855, "net": 340.42857142857144 },
        { "region": "Southwest", "sector": "Developed", "start": 1980, "end": 1986, "gain": 293, "loss": 3.5, "net": 289.5 },
        { "region": "Southwest", "sector": "Developed", "start": 1986, "end": 1992, "gain": 456, "loss": 0.3333333333333333, "net": 455.6666666666667 },
        { "region": "Southwest", "sector": "Developed", "start": 1992, "end": 2000, "gain": 300.125, "loss": 1.5, "net": 298.625 },
        { "region": "Southwest", "sector": "Developed", "start": 2001, "end": 2006, "gain": 390.6, "loss": 0, "net": 390.6 },
        { "region": "Southwest", "sector": "Developed", "start": 2006, "end": 2011, "gain": 198.6, "loss": 0, "net": 198.6 },
        { "region": "Southwest", "sector": "Forest", "start": 1973, "end": 1980, "gain": 114.28571428571428, "loss": 358.57142857142856, "net": -244.28571428571428 },
        { "region": "Southwest", "sector": "Forest", "start": 1980, "end": 1986, "gain": 332, "loss": 376.5, "net": -44.5 },
        { "region": "Southwest", "sector": "Forest", "start": 1986, "end": 1992, "gain": 292.6666666666667, "loss": 591.6666666666666, "net": -298.99999999999994 },
        { "region": "Southwest", "sector": "Forest", "start": 1992, "end": 2000, "gain": 283.625, "loss": 919.25, "net": -635.625 },
        { "region": "Southwest", "sector": "Forest", "start": 2001, "end": 2006, "gain": 88.8, "loss": 764.8, "net": -676 },
        { "region": "Southwest", "sector": "Forest", "start": 2006, "end": 2011, "gain": 33.4, "loss": 763.4, "net": -730 },
        { "region": "Southwest", "sector": "Grassland/Shrubland", "start": 1973, "end": 1980, "gain": 632, "loss": 1463.857142857143, "net": -831.8571428571429 },
        { "region": "Southwest", "sector": "Grassland/Shrubland", "start": 1980, "end": 1986, "gain": 817.6666666666667, "loss": 1229.3333333333333, "net": -411.6666666666665 },
        { "region": "Southwest", "sector": "Grassland/Shrubland", "start": 1986, "end": 1992, "gain": 2148.1666666666665, "loss": 1148.8333333333333, "net": 999.3333333333333 },
        { "region": "Southwest", "sector": "Grassland/Shrubland", "start": 1992, "end": 2000, "gain": 1018.25, "loss": 1482.125, "net": -463.875 },
        { "region": "Southwest", "sector": "Grassland/Shrubland", "start": 2001, "end": 2006, "gain": 1048.8, "loss": 834.8000000000001, "net": 213.9999999999999 },
        { "region": "Southwest", "sector": "Grassland/Shrubland", "start": 2006, "end": 2011, "gain": 839.8, "loss": 327.8, "net": 511.99999999999994 },
        { "region": "Southwest", "sector": "Mechanically disturbed", "start": 1973, "end": 1980, "gain": 144, "loss": 196.14285714285714, "net": -52.14285714285714 },
        { "region": "Southwest", "sector": "Mechanically disturbed", "start": 1980, "end": 1986, "gain": 336, "loss": 169.5, "net": 166.5 },
        { "region": "Southwest", "sector": "Mechanically disturbed", "start": 1986, "end": 1992, "gain": 569.5, "loss": 315.33333333333337, "net": 254.16666666666663 },
        { "region": "Southwest", "sector": "Mechanically disturbed", "start": 1992, "end": 2000, "gain": 260.5, "loss": 376.875, "net": -116.375 },
        { "region": "Southwest", "sector": "Mechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Mechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Nonmechanically disturbed", "start": 1973, "end": 1980, "gain": 320.14285714285717, "loss": 111.42857142857143, "net": 208.71428571428572 },
        { "region": "Southwest", "sector": "Nonmechanically disturbed", "start": 1980, "end": 1986, "gain": 176.16666666666669, "loss": 376.6666666666667, "net": -200.5 },
        { "region": "Southwest", "sector": "Nonmechanically disturbed", "start": 1986, "end": 1992, "gain": 243.33333333333331, "loss": 177, "net": 66.33333333333331 },
        { "region": "Southwest", "sector": "Nonmechanically disturbed", "start": 1992, "end": 2000, "gain": 1134.125, "loss": 178.5, "net": 955.625 },
        { "region": "Southwest", "sector": "Nonmechanically disturbed", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Nonmechanically disturbed", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Snow/Ice", "start": 1973, "end": 1980, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Snow/Ice", "start": 1980, "end": 1986, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Snow/Ice", "start": 1986, "end": 1992, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Snow/Ice", "start": 1992, "end": 2000, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Snow/Ice", "start": 2001, "end": 2006, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Snow/Ice", "start": 2006, "end": 2011, "gain": 0, "loss": 0, "net": 0 },
        { "region": "Southwest", "sector": "Water", "start": 1973, "end": 1980, "gain": 230.42857142857142, "loss": 43.714285714285715, "net": 186.7142857142857 },
        { "region": "Southwest", "sector": "Water", "start": 1980, "end": 1986, "gain": 204.83333333333334, "loss": 247.33333333333334, "net": -42.5 },
        { "region": "Southwest", "sector": "Water", "start": 1986, "end": 1992, "gain": 70.33333333333333, "loss": 169.66666666666666, "net": -99.33333333333333 },
        { "region": "Southwest", "sector": "Water", "start": 1992, "end": 2000, "gain": 54.125, "loss": 51.625, "net": 2.5 },
        { "region": "Southwest", "sector": "Water", "start": 2001, "end": 2006, "gain": 159.4, "loss": 434.2, "net": -274.79999999999995 },
        { "region": "Southwest", "sector": "Water", "start": 2006, "end": 2011, "gain": 158, "loss": 113.4, "net": 44.599999999999994 },
        { "region": "Southwest", "sector": "Wetland", "start": 1973, "end": 1980, "gain": 34.42857142857143, "loss": 95.71428571428572, "net": -61.28571428571429 },
        { "region": "Southwest", "sector": "Wetland", "start": 1980, "end": 1986, "gain": 106.5, "loss": 122.83333333333334, "net": -16.333333333333343 },
        { "region": "Southwest", "sector": "Wetland", "start": 1986, "end": 1992, "gain": 86.33333333333333, "loss": 72.66666666666667, "net": 13.666666666666657 },
        { "region": "Southwest", "sector": "Wetland", "start": 1992, "end": 2000, "gain": 43.625, "loss": 42.625, "net": 1 },
        { "region": "Southwest", "sector": "Wetland", "start": 2001, "end": 2006, "gain": 262, "loss": 96.60000000000001, "net": 165.39999999999998 },
        { "region": "Southwest", "sector": "Wetland", "start": 2006, "end": 2011, "gain": 59.2, "loss": 11, "net": 48.2 }
    ];

function trimToThree(d) {
    return +d.toFixed(3);
}

function getWrapper(svg) {
    return d3.select(svg.node().closest(".graphic--stacked-bar"))
}

function getSectorOffset(sector) {
    var sectors = [
        "Agriculture",
        "Barren",
        "Developed",
        "Forest",
        "Grassland/Shrubland",
        "Water",
        "Wetland",
        "Snow/Ice",
        "Mechanically disturbed",
        "Nonmechanically disturbed"
    ];

    return sectors.indexOf(sector);
}

function typeColor(type) {
    switch (type) {
        case "Forest":
          return "#a1d06a";
        case "Developed":
          return "#e31126";
        case "Grassland/Shrubland":
          return "#d7db56";
        case "Snow/Ice":
          return "#fffff0";
        case "Water":
          return "#4a6aa7";
        case "Wetland":
          return "#aacee7";
        case "Agriculture":
          return "#ae742a";
        case "Barren":
          return "#d3d3d3";
        case "Mechanically disturbed":
          return "#c41e82";
        case "Nonmechanically disturbed":
          return "#6a3e9e";
        case "Mining":
          return "#645436";
    }
}

function makeTooltipBody(values) {
    var tbody = ""

    values.forEach(function (d) {
        if (d.sector === "Mechanically disturbed" || d.sector === "Nonmechanically disturbed") {
            return;
        }

        tbody += "<tr>";
        tbody += "<td>" + d.sector + "</td>";
        tbody += "<td>" + trimToThree(d.net) + "</td>";
        tbody += "<td>" + trimToThree(d.gain) + "</td>";
        tbody += "<td>" + trimToThree(d.loss) + "</td>";
        tbody += "</tr>";
    });

    values.forEach(function (d) {
        if (d.sector !== "Mechanically disturbed" && d.sector !== "Nonmechanically disturbed") {
            return;
        }

        tbody += "<tr>";
        tbody += "<td>" + d.sector + "</td>";
        tbody += "<td>" + trimToThree(d.net) + "</td>";
        tbody += "<td>" + trimToThree(d.gain) + "</td>";
        tbody += "<td>" + trimToThree(d.loss) + "</td>";
        tbody += "</tr>";
    });

    return tbody;
}

var tip = d3.tip()
    .attr('class', 'd3-tip graphic--stacked-bar--tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<h4>Land Cover Change in the " + d.region + " region</h4>" +
            "<h5>" + d.start + " - " + d.end + "</h5>" +
            "<table><thead><tr>"+
            "<th>Land Cover Class</th>" +
            "<th>Net Change</th>" +
            "<th>Gains</th>" +
            "<th>Losses</th>" +
            "</tr></thead>"+
            "<tbody>" + makeTooltipBody(d.values) + "</tbody>" +
            "</table>" +
            "<p class='tooltip-helper'>*All values are in square miles</p>";
    });

function handleTransitions(data, rects, x, y, yAxis, baseline) {
    y.domain(getRegionDomain(data));

    rects.data(data)
        .transition(500)
        .attr("height", function(d) { return Math.abs(Math.abs(y(d.net)) - Math.abs(y(0))); })
        .attr("width", function(d, i) { return (x(d.end) - x(d.start)) / getLandcoverSectorCount(d.start); })
        .attr("y", function (d) { return d.net > 0 ? y(d.net) : y(0) })
        .attr("x", function(d, i) { return x(d.start) + ((x(d.end) - x(d.start)) * (getSectorOffset(d.sector) / getLandcoverSectorCount(d.start))); })
        .attr("data-region", function (d) { return d.region; })

    baseline.transition(500)
        .attr("x2", x(x.domain()[1]))
        .attr("y1", y(0) + .5)
        .attr("y2", y(0) + .5)

    yAxis.transition(500).call(d3.axisLeft(y))
}

function getRegionDomain(data) {
    var domain = [0, 0];
    data.forEach(function (d) {
        if (d.net < domain[0]) {
            domain[0] = d.net;
        }
        if (d.net > domain[1]) {
            domain[1] = d.net;
        }
    })

    domain[0] = domain[0] - (100 + (domain[0] % 100));
    domain[1] = domain[1] + (100 - (domain[1] % 100));

    return domain;
}

function getLandcoverSectorCount(year) {
    // These years have no data for Mech disturb, nonmech disturb and mining
    if (year === 2001 || year === 2006) {
        return 8;
    }

    return 10;
}

function findRegionData(groupedData, region) {
    var i, l;
    for (i = 0, l = groupedData.length; i < l; i++) {
        if (groupedData[i].key === region) {
            return groupedData[i].values;
        }
    }
}

function buildTooltipData(values) {
    var data = [];
    var cachedDates = [];

    values.forEach(function (d) {
        var startDate = d.start;

        if (cachedDates.indexOf(startDate) === -1) {
            cachedDates.push(startDate);
            data.push({
                "region": d.region,
                "start": startDate,
                "end": d.end,
                "values": [d],
            });
        } else {
            data[cachedDates.indexOf(startDate)].values.push(d);
        }
    })

    return data;
}

function handleTooltipKeypress(d, i, nodes) {
    if (d3.select(".d3-tip").node().style.opacity === "0") {
        tip.show.call(this, d, i, nodes);
    } else {
        tip.hide.call(this, d, i, nodes);
    }
}

var initStackedBarChart = {
    draw: function(config) {
        var barType = "stacked";
        var sector = undefined;
        var dataType = "percent";

        var wrapper = d3.select(config.wrapper);
        var domEle = config.element;
        var data = config.data.map(function (d) {
            d.percent = d.percent * 100;
            d.gain = d.gain * 0.386102;
            d.loss = d.loss * 0.386102;
            d.net = d.net * 0.386102;
            return d;
        });
        var margin = {top: 5, right: 22, bottom: 49, left: 74};

        var width = 720 - margin.left - margin.right;
        var height = 560 - margin.top - margin.bottom;

        var groupedData = d3.nest().key(function (d) { return d.region; }).entries(data);

        var x = d3.scaleLinear()
            .rangeRound([0, width])
            .domain([1972, 2012]);
        var y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain(getRegionDomain(groupedData[0].values));

        var svg = wrapper.select("."+domEle).append("svg")
            .attr("viewBox", "0 0 " +
                  (width + margin.left + margin.right) + " " +
                  (height + margin.top + margin.bottom)
                 )
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        var highlights = svg.append("g")
            .attr("class", "highlights")

        highlights.selectAll("rect")
            .data([[1973, 1980], [1980, 1986], [1986, 1992], [1992, 2000], [2001, 2006], [2006, 2011]])
            .enter()
            .append("rect")
            .attr("class", "highlight")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", y(y.domain()[1]))
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })
            .attr("height", y(y.domain()[0]))
            .attr("fill", function (d, i) { return i % 2 ? "#e0e0e0" : "#e8e8e8" })

        var grid = svg.append("g")
            .attr("class", "gridlines");

        grid.selectAll(".gridline--x")
            .data([1973, 1980, 1986, 1992, 2000, 2001, 2006, 2011])
            .enter()
            .append("line")
            .attr("class", "gridline gridline--x")
            .attr("x1", function (d) { return x(d) + .5; })
            .attr("x2", function (d) { return x(d) + .5; })
            .attr("y1", y(y.domain()[0]))
            .attr("y2", y(y.domain()[1]))
            .attr("stroke", "#ccc")
            .attr("stroke-dasharray", "4")

        var rects = svg.selectAll("rect.stacked-bar--bar")
            .data(groupedData[0].values)
            .enter().append("rect")
            .classed("stacked-bar--bar", true)
            .attr("height", function(d) { return Math.abs(Math.abs(y(d.net)) - Math.abs(y(0))); })
            .attr("width", function(d, i) { return (x(d.end) - x(d.start)) / getLandcoverSectorCount(d.start); })
            .attr("y", function (d) { return d.net > 0 ? y(d.net) : y(0) })
            .attr("x", function(d, i) { return x(d.start) + ((x(d.end) - x(d.start)) * (getSectorOffset(d.sector) / getLandcoverSectorCount(d.start))); })
            .attr("data-region", function (d) { return d.region; })
            .attr("data-type", function (d) { return d.sector; })
            .style("fill", function(d) { return typeColor(d.sector); })

        var xAxis = svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(d3.format("d")));

        xAxis.append("text")
            .attr("class", "axis--label")
            .attr("transform", "translate(" + (width/2) + ",40)")
            .attr("text-anchor", "middle")
            .append("tspan")
            .attr("x", 0)
            .attr("class", "axis--label--x")
            .text("Year");

        var yAxis = svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(y));

        yAxis.append("text")
            .attr("class", "axis--label")
            .attr("transform", "translate(-50, " + ((height / 2) - 25) + ") rotate(-90)")
            .attr("text-anchor", "middle")
            .append("tspan")
            .attr("x", 0)
            .attr("class", "axis--label--x")
            .text("Net Change (Square Miles)");

        var baseline = grid.append("line")
            .attr("class", "gridline gridline--y")
            .attr("x2", x(x.domain()[1]))
            .attr("y1", y(0) + .5)
            .attr("y2", y(0) + .5)
            .attr("stroke", "#aaa")

        var hoverRegions = svg.selectAll("rect.tooltip-box")
            .data(buildTooltipData(groupedData[0].values))
            .enter()
            .append("rect")
            .attr("class", "tooltip-box")
            .attr("x", function(d) { return x(d.start); })
            .attr("y", y(y.domain()[1]))
            .attr("width", function(d) { return x(d.end) - x(d.start); })
            .attr("height", y(y.domain()[0]))
            .attr("fill", "rgba(0,0,0,0)")
            .attr("tabindex", 0)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('keypress', handleTooltipKeypress)

        function handleRegionChange() {
            if (d3.event.key && d3.event.key !== "Enter") {
                return;
            }

            if (d3.select(this).classed("active")) {
                return;
            }

            wrapper.select(".active").classed("active", false);
            d3.select(this).classed("active", true);

            var region = this.getAttribute("data-for");
            var newData = findRegionData(groupedData, region);
            handleTransitions(newData, rects, x, y, yAxis, baseline);
            hoverRegions.data(buildTooltipData(newData));
        }
        wrapper.selectAll(".region-item a").on("click", handleRegionChange);
        wrapper.selectAll(".region-item a").on("keypress", handleRegionChange);
    }
}

d3.selectAll(".figure--5_2").each(function () {
    initStackedBarChart.draw({
        data: dataset,
        element: 'stacked-bar',
        wrapper: this
    });
})

// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) {
            return null;
        }
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
})();
