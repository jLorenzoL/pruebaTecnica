import { Paginacion } from './../../../models/paginacion';
import { DataModel } from './../../../models/data.model';
import { ReportService } from './../../../services/report.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatSort } from '@angular/material';
import { GeneralService } from 'src/app/services/general.service';
import { map, tap } from 'rxjs/operators';
import { ReportDetailComponent } from './detail/reportDetail.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

  export class ReportComponent implements OnInit {
   
    // paginacion: Paginacion;
    // ELEMENT_DATA : DataModel[] = [];
    // displayedColumns: string[] = ['borough', 'cuisine', 'name'];
    // dataSource = new MatTableDataSource<DataModel>(this.ELEMENT_DATA);

    dataSource : DataModel = null; 
    displayedColumns: string[] = ['borough', 'cuisine', 'name', 'accion'];

    @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    constructor( private reportService : ReportService,
                 private generalService : GeneralService,
                 private dialog: MatDialog) { 
    }
  
    ngOnInit() {
      this.getAllReports();
    }

    public getAllReports(){
      this.reportService.obtenerlistClient(0,10).pipe(
        map((userData : DataModel) => this.dataSource = userData)
      ).subscribe();
      
    }

    onPaginateChange(event : PageEvent): void {
      let page = event.pageIndex;
      let size = event.pageSize;

      this.reportService.obtenerlistClient(page,size).pipe(
        // tap(users => console.log(users)),
        map((userData : DataModel) => this.dataSource = userData)
      ).subscribe();
    }

    editAttribute(itemSeleccionado: DataModel){
      // console.log(itemSeleccionado.id)
      this.dialog.open(ReportDetailComponent , {
        disableClose : true,
        closeOnNavigation : true,
        data : itemSeleccionado
      })
    }
  }
  